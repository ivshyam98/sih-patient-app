import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import {AuthService} from '../../services/auth';
import {NgForm} from '@angular/forms';
import firebase from 'firebase';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { HomePage } from '../home/home';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public name : string;
  public email : string;
  public phone : number; 
  public aadharno :number;
  public gender : any;
  public smoker:any;
  public userProfile: any;
  public downloadUrl:string;
  public aadharimageurl:any;
  picdata:any;
  picurl:any;
  mypicref:any;
   
  @ViewChild('password') password;
  constructor(public navCtrl: NavController,private authService: AuthService,private loadCtrl: LoadingController,private alertCtrl:AlertController, public navParams: NavParams,private filePath: FilePath,private fileChooser:FileChooser,private file: File) {
    this.userProfile = firebase.database().ref('patients');
    this.mypicref = firebase.storage().ref('aadharimages/')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  onSignUp(form:NgForm){
    var patientdetails = {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      gender: form.value.gender,
      smoker:form.value.smoker,
      aadharno:form.value.aadharno
    };
    let loading = this.loadCtrl.create({
      content: 'Creating user...'
    });
  
    loading.present();
   
    console.log(form.value.email);
    this.authService.signUp(form.value.email,this.password.value)
    .then(data=>{

      console.log(data);
      loading.dismiss();
      console.log(this.authService.getActiveUser().uid);
      this.userProfile.child(this.authService.getActiveUser().uid).set(
        patientdetails
      );
      this.navCtrl.setRoot(HomePage);
      
      })
    .catch(error=>{
      loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
    });

    
  }
  chooseImage()
  { 
    // const loading = this.loadingCtrl.create({
    //   content: 'Selecting Image....'
    // });
    // loading.present();
    //alert("hi");
     this.fileChooser.open().then((uri)=>{
      alert(uri);
      this.filePath.resolveNativePath(uri).then((filePath)=>{
        //alert(filePath);
        let dirPathSegements = filePath.split('/');
        let fileName=dirPathSegements[dirPathSegements.length-1];
        dirPathSegements.pop();
        let dirPath = dirPathSegements.join('/');
        //loading.dismiss();
        this.file.readAsArrayBuffer(dirPath,fileName).then(async (buffer)=>{
          
          await this.upload(buffer,fileName);
        
        }).catch((err)=>{
          alert(err.toString());
          alert("Image not uploaded");
        });
      });
    });
  }
  async upload(buffer,name)
  {const loading = this.loadCtrl.create({
    content: 'Uploading Image....'
  });
  loading.present();
    let blob = new Blob([buffer],{type:"image/jpeg"})
    let storage = firebase.storage();
    storage.ref('aadharimages/'+name).put(blob).then((image)=>{
      //alert("Done");
      (image.ref.getDownloadURL().then(img=>{
        
        this.downloadUrl = img.toString();
      
       loading.dismiss();
       alert('Image Uploaded');
      }));
    }).catch((error)=>{
      alert(JSON.stringify(error));
    })
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController} from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import {AuthService} from '../../services/auth';
import firebase from 'firebase';
import { HomePage } from '../home/home';

/**
 * Generated class for the VerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {
  public downloadUrl:string;
  public uid:string;
  constructor(public navCtrl: NavController, private authService: AuthService,private loadCtrl: LoadingController,private alertCtrl:AlertController, public navParams: NavParams,private filePath: FilePath,private fileChooser:FileChooser,private file: File) {
   this.uid = firebase.auth().currentUser.uid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPage');
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
        firebase.database().ref('patients/'+this.uid).update({
         aadharUrl:this.downloadUrl
        })
       loading.dismiss();
       alert('Image Uploaded');
      }));
    }).catch((error)=>{
      alert(JSON.stringify(error));
    })
  }
  completeRegistration()
  {
    this.navCtrl.setRoot(HomePage);

  }
}

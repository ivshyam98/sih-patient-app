import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';
import firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public x:number;
  public uid:string;
  diagnosisListRef$ : Observable<any[]>
  options:BarcodeScannerOptions;
  constructor(public navCtrl: NavController,private alertController:AlertController,private database: AngularFireDatabase,private barcodeScanner: BarcodeScanner) {
    this.x = Math.floor((Math.random() * 5) + 1);
    //alert(this.x)
    this.popquotes(this.x);
    this.uid=firebase.auth().currentUser.uid;
    console.log(this.uid)
     this.diagnosisListRef$ = this.database.list('patients/'+this.uid+'/diagnosis').valueChanges();
                              
  }                  
  popquotes(n:number){
   
    this.presentAlertMultipleButtons(n)
  }
  async presentAlertMultipleButtons(n:number) {
    var hquotes = ["Calm mind brings inner strength and self-confidence, so that's very important for good health"
    , "To enjoy the glow of good health, you must exercise"
   ,"Good health and good sense are two of life's greatest blessings" 
   ,"Good health and good sense are two of life's greatest blessings","Good health and good sense are two of life's greatest blessings"];
    const alert = await this.alertController.create({
      
      message:hquotes[n],
      buttons: ['Disagree', 'Agree']
    });

    await alert.present();
  }
  async scanBarcode()
  {
   
      const results = await this.barcodeScanner.scan()
      console.log(results)
      alert(results.format)
  }
}

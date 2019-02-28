import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public x:number;
  options:BarcodeScannerOptions;
  constructor(public navCtrl: NavController,private alertController:AlertController,private barcodeScanner: BarcodeScanner) {
    this.x = Math.floor((Math.random() * 5) + 1);
    //alert(this.x)
    this.popquotes(this.x);
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

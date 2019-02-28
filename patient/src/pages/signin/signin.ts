import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import {AuthService} from '../../services/auth';
import {NgForm} from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,private authService:AuthService, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }
  goToRegister()
  {
    this.navCtrl.push(SignupPage);
  }
  onSignIn(form:NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    console.log(form.value);
    this.authService.signIn(form.value.email,form.value.password).then
    (data=>{
      loading.dismiss();
      this.navCtrl.push(HomePage);
    }).catch(error=>{loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Signin failed!',
        message: error.message,
        buttons: ['Ok']
      });
      alert.present();});
    
  
  }
}

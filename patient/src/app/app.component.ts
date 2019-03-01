import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SigninPage } from '../pages/signin/signin';
import { AuthService } from '../services/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SigninPage;
  
  isAuthenticated = false;
  uid:any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, private authService:AuthService,public splashScreen: SplashScreen) {
    this.initializeApp();
    
    firebase.initializeApp({apiKey: "AIzaSyBfbeUhDGFqYDTS889Y8RpVkXtXLWFH5iQ",
    authDomain: "ncd-surveillance-system.firebaseapp.com",
    databaseURL: "https://ncd-surveillance-system.firebaseio.com",
    projectId: "ncd-surveillance-system",
    storageBucket: "ncd-surveillance-system.appspot.com",
    messagingSenderId: "728125729015"});
    firebase.auth().onAuthStateChanged( user=>{
      if (user) {

        this.isAuthenticated = true;
       // this.rootPage=HomePage;
        
      } else {
        this.isAuthenticated = false;
        this.rootPage=SigninPage;
      }
    } )
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  onLogOut(){
    this.nav.setRoot(SigninPage);
    this.authService.logOut();
   
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

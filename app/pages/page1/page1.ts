import {Page, NavController, IonicApp} from 'ionic-angular';
import {LoginPage} from '../login-page/login-page';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  constructor(private nav:NavController, private app:IonicApp) {

  }
  
  login() {
    this.app.getComponent('nav').setRoot(LoginPage);
    //this.nav.setRoot(LoginPage);
  }
}

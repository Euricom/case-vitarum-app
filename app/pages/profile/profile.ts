import {Page, NavController, IonicApp} from 'ionic-angular';
import {LoginPage} from '../login-page/login-page';


@Page({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
  constructor(private nav: NavController, private app: IonicApp) {

  }
  
  doLogout() {
    this.app.getComponent('nav').setRoot(LoginPage);
    //this.nav.setRoot(LoginPage);
  }
}

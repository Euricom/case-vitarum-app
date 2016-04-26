import {Page, NavController, IonicApp} from 'ionic-angular';
import {AuthService} from '../../core/services/auth';
import {LoginPage} from '../login-page/login-page';


@Page({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
  constructor(private nav: NavController, private app: IonicApp, private auth: AuthService) {

  }
  
  doLogout() {
    this.auth.logout()
      .then(() => {
        this.app.getComponent('nav').setRoot(LoginPage);
      });
  }
}

import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {AuthService} from '../../core/services/auth';

/*
  Generated class for the LoginPagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/login-page/login-page.html',
})
export class LoginPage {
  
  constructor(private nav: NavController, private auth: AuthService) {
    
  }
  
  doLogin() {
    this.auth.login()
      .then(() => {
        this.nav.setRoot(TabsPage);
      });
  }
}
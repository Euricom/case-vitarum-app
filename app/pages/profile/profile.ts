import { Page, NavController, IonicApp } from 'ionic-angular';
import { AuthService } from '../../core/services/auth';
import { LoginPage } from '../login/login';

@Page({
    templateUrl: '/build/pages/profile/profile.html'
})

export class ProfilePage {
    constructor(private auth:AuthService, private nav:NavController, private app:IonicApp) {

    }
    
    doLogout() {
        this.auth.logout()
           .then((res) => {
               if (res) {
                   console.log('logged out, rerouting');
                   //this.nav.setRoot(LoginPage);
                    let nav2 = this.app.getComponent('nav');
                    nav2.setRoot('HomePage');
               }
           });
    }
}
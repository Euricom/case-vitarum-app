import { Page, NavController, IonicApp } from 'ionic-angular';
import { AuthService } from '../../core/services/auth';
import { HomePage } from '../home/home';

@Page({
    templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
    
    constructor(private auth: AuthService, private nav: NavController, private app:IonicApp) {
    }

    doLogin() {
        this.auth.login()
            .then((res) => {
                if (res) {
                    console.log('Login success, rerouting');
                    this.nav.setRoot(HomePage);
                    // let nav2 = this.app.getComponent('nav');
                    // nav2.setRoot(HomePage);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
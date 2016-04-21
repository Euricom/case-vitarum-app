import 'es6-shim';
import { App, Platform, IonicApp, Modal } from 'ionic-angular';
import { provide } from 'angular2/core';
import { Http } from 'angular2/http'
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { StatusBar } from 'ionic-native';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { AuthService } from './core/services/auth';

@App({
    template: '<ion-nav id="nav" [root]="rootPage"></ion-nav>',
    providers: [
        provide(AuthHttp, {
            useFactory: (http) => {
                return new AuthHttp(new AuthConfig(), http);
            },
            deps: [Http]
        }),
        AuthService
    ],
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})

export class MyApp {
    rootPage:any = HomePage;
    nav;
    
    constructor(private platform:Platform, private auth:AuthService, private app:IonicApp) {
        // platform.ready().then(() => {
        //     StatusBar.styleDefault();
        // });
    }

    ngAfterViewInit() {
        if (!this.auth.authenticated()) {
            this.nav = this.app.getComponent('nav');
            let modal = Modal.create(LoginPage);
            this.nav.present(modal);
        }
    }
}

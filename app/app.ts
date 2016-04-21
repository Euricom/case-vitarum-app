import 'es6-shim';
import { App, Platform } from 'ionic-angular';
import { provide } from 'angular2/core';
import { Http } from 'angular2/http'
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { StatusBar } from 'ionic-native';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { AuthService } from './core/services/auth';

@App({
    template: '<ion-nav [root]="rootPage" id="nav"></ion-nav>',
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
    rootPage:any = LoginPage;
    
    constructor(private platform:Platform, private auth:AuthService) {
        platform.ready().then(() => {
            StatusBar.styleDefault();
        });
    }

    ngAfterViewInit() {
        if (this.auth.authenticated()) {
            this.rootPage = HomePage;
        }
    }
}

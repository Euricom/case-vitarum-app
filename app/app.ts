import 'es6-shim';
import { App, Platform, IonicApp, Modal } from 'ionic-angular';
import { provide } from 'angular2/core';
import { Http } from 'angular2/http'
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { StatusBar } from 'ionic-native';
import { HomePage } from './pages/home/home';
import { ProfilePage } from './pages/profile/profile';
import { EmployeeListPage } from './pages/employee-list/employee-list';
import { LoginPage } from './pages/login/login';
import { AuthService } from './core/services/auth';

@App({
    //template: '<ion-nav id="nav" [root]="rootPage"></ion-nav>',
    template: `
        <ion-nav id="nav" [root]="rootPage" *ngIf="!auth.authenticated()"></ion-nav>
        <ion-tabs selectedIndex="0" *ngIf="auth.authenticated()">
            <ion-tab tabIcon="search" [root]="tab1"></ion-tab>
            <ion-tab tabIcon="contact" [root]="tab2"></ion-tab>
        </ion-tabs>`,
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
    tab1 = EmployeeListPage;
    tab2 = ProfilePage;
    
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

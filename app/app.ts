import 'es6-shim';
import { App, Platform, IonicApp, MenuController } from 'ionic-angular';
import { provide } from 'angular2/core';
import { Http } from 'angular2/http'
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { StatusBar } from 'ionic-native';
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { AuthService } from './core/services/auth';

@App({
    template: `
        <ion-menu [content]="content">
            <ion-toolbar>
                <ion-title>Pages</ion-title>
            </ion-toolbar>
            <ion-content>
                <ion-list>
                <button ion-item (click)="openPage(homePage)">
                    Home
                </button>
                <button ion-item (click)="openPage(profilePage)">
                    Profile
                </button>
                </ion-list>
            </ion-content>
        </ion-menu>
                
        <ion-nav id="nav" #content [root]="rootPage"></ion-nav>`,
    providers: [
        provide(AuthHttp, {
            useFactory: (http) => {
                return new AuthHttp(new AuthConfig(), http);
            },
            deps: [Http]
        }),
        AuthService
    ]
})

export class MyApp {
    rootPage:any = LoginPage;
    loginPage = LoginPage;
    homePage = HomePage;
    nav;
    
    constructor(private platform:Platform, private auth:AuthService, private app:IonicApp, private menu:MenuController) {
        platform.ready().then(() => {
            StatusBar.styleDefault();
        });
    }

    ngAfterViewInit() {
        if (this.auth.authenticated()) {
            this.nav = this.app.getComponent('nav');
            this.nav.setRoot(HomePage);
        }
    }
}

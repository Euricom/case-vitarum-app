import {App, Platform, MenuController, IonicApp} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {provide} from 'angular2/core';
import {Http} from 'angular2/http'
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthService} from './core/services/auth';

import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login-page/login-page';


@App({
  template: `<ion-nav id="nav" [root]="rootPage"></ion-nav>`,
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
  rootPage: any = LoginPage;
  menu: any;
  nav;

  constructor(platform: Platform, menu: MenuController, private auth: AuthService, private app: IonicApp) {
    this.menu = menu;
    platform.ready().then(() => {
      //StatusBar.styleDefault();
      StatusBar.hide();
    });
  }
  
  ngAfterViewInit() {
      if (this.auth.authenticated()) {
          this.nav = this.app.getComponent('nav');
          this.nav.setRoot(TabsPage);
      }
  }
}

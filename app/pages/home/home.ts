import {Page, NavController, IonicApp} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/home/home.html',
})

export class HomePage {
  constructor(private nav:NavController, private app:IonicApp) {
  }
}

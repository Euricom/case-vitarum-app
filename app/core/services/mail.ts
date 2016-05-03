import {Injectable} from 'angular2/core';
import {Platform} from 'ionic-angular';

@Injectable() 

export class MailService {    
  constructor(private platform: Platform) {
  }
  
  openMailClient(fromAddress, subject, body) {          
    let cordovaMail = this._cordovaMail();
    
    console.log('result of cordovaMail:', cordovaMail);
    
    if (cordovaMail) {
      let email = {
        from: fromAddress,
        subject: subject,
        body: body,
        isHtml: true
      };
      
      cordovaMail.open(email);
      return;
    }
    
    window.open(`mailto:?Subject=${subject}&Body=${body}`, '_system');
  }

  _cordovaMail() {
    let cordovaEmail = typeof cordova !== 'undefined' ? cordova.plugins.email : '';

    if (cordovaEmail) {
      return cordovaEmail;
    }
    
    return null;
  }
}
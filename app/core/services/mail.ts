import {Injectable} from 'angular2/core';

@Injectable() 

export class MailService {    
  constructor() {}
  
  openMailClient(fromAddress, subject, body) {    
    let cordovaMail = this._cordovaMail();
    console.log(cordovaMail);
    
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
    
    console.log('cordova', cordovaEmail);
    
    // if (cordovaEmail) {
    //   cordovaEmail.isAvailable(
    //     function(isAvailable) {
    //       if (isAvailable) {
    //         return cordovaEmail;
    //       }
    //     }
    //   );
    // }
    
    return null;
  }
}
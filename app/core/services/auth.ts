import { Storage, LocalStorage } from 'ionic-angular';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Rx';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()

export class AuthService {
    jwtHelper: JwtHelper = new JwtHelper();
    lock = new Auth0Lock('trKUlWTUIgmCX4bTOvfQlPSK86YZlaDf', 'euri.eu.auth0.com');
    local: Storage = new Storage(LocalStorage);
    user: Object;

    constructor(private authHttp: AuthHttp) {
        // If there is a profile saved in local storage
        this.local.get('profile').then(profile => {
            this.user = JSON.parse(profile);
        }).catch(error => {
            console.log(error);
        });
    }

    public authenticated() {
        // Check if there's an unexpired JWT
        return tokenNotExpired();
    }

    public login() {
        // Show the Auth0 Lock widget
        let loginPromise = new Promise((resolve, reject) => {
            this.lock.show({
                authParams: {
                    scope: 'openid email offline_access',
                    device: 'Mobile device',
                    icon: './assets/Vitarum-logo.svg',
                    closable: true,
                    connections: ['google-oauth2', 'linkedin'],
                }
            }, (err, profile, token, accessToken, state, refreshToken) => {
                if (err) {
                    reject(err);
                }
                console.log(`token ${token}`);
                console.log(`accessToken ${accessToken}`);
                console.log(`refreshToken ${refreshToken}`);
                this.local.set('profile', JSON.stringify(profile));
                this.local.set('id_token', token);
                this.local.set('refresh_token', refreshToken);
                this.user = profile;
                resolve(true);
            });
        });

        return loginPromise;
    }

    public logout() {
        let logoutPromise = new Promise((resolve, reject) => {
            this.local.remove('profile');
            this.local.remove('id_token');
            this.local.remove('refresh_token');
            this.user = null;  
            console.log('removed all info');
            resolve(true);
        });
        
        return logoutPromise;
    }
}
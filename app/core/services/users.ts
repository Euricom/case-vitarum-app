import {Injectable} from 'angular2/core';
import {AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()

export class UserService {
    error;
    message;
    constructor(private authHttp: AuthHttp) {

    }

    getUsers() {
        return this.authHttp.get('https://euricom-vitarum-dev.herokuapp.com/api/users')
            .map(res => res.json());
    }
}
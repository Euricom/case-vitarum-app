import {Injectable} from 'angular2/core';
import {AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable() 

export class EmployeeService {
    error;
    message;
    constructor(private authHttp: AuthHttp) {
        
    }
    
    getEmployees() {
        return this.authHttp.get('http://jsonplaceholder.typicode.com/users')
            .map(res => res.json());
      
        // return new Promise((resolve, reject) => {
        //     resolve([
        //         {
        //             firstName: 'David',
        //             lastName: 'De Keersmaecker'
        //         },
        //         {
        //             firstName: 'Annelien',
        //             lastName: 'Kortleven'
        //         }
        //     ]);
        // });
    }
}
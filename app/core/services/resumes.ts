import {Injectable} from 'angular2/core';
import {AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable() 

export class ResumeService {
    error;
    message;
    constructor(private authHttp: AuthHttp) {
        
    }
    
    getResumeSummaryByUserId(userId) {
        return this.authHttp.get(`https://euricom-vitarum-dev.herokuapp.com/api/users/${userId}/resumes?summary=true`)
          .map(res => res.json());
    }
    
    getPublishedResumeById(id) {
      return this.authHttp.get(`https://euricom-vitarum-dev.herokuapp.com/api/resumes/published/${id}`)
        .map(res => res.json());
    }
}
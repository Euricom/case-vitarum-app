import {Page, NavController, NavParams} from 'ionic-angular';
import {ResumeService} from '../../core/services/resumes';

@Page({
  templateUrl: 'build/pages/user-detail/user-detail.html',
  providers: [ResumeService]
})

export class UserDetailPage {
  user;
  resumeList = [];
  
  constructor(private nav: NavController, private navParams: NavParams, private resumeService:ResumeService) {
    this.user = navParams.get('user');
    this.getUserResumesById(this.user.id);
  }
  
  getUserResumesById(id) {
    this.resumeService.getResumeSummaryByUserId(id)
      .subscribe(
        results => {
          for(let resume of results.resumes) {
            this.resumeList.push(resume);
          }
        },
        err => console.log(err)
      );
  }
  
  sendResume(resume) {
    console.log(resume.id);
    //console.log(`sending CV ${cv} to ${email}`);
    //window.open(`mailto:${email}`, '_system');
  }
}

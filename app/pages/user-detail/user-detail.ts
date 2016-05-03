import {Page, NavController, NavParams} from 'ionic-angular';
import {ResumeService} from '../../core/services/resumes';
import {MailService} from '../../core/services/mail';

@Page({
  templateUrl: 'build/pages/user-detail/user-detail.html',
  providers: [ResumeService, MailService]
})

export class UserDetailPage {
  user;
  resumeList = [];
  
  constructor(private nav: NavController, private navParams: NavParams, private resumeService:ResumeService, private mailService:MailService) {
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
    console.log(this.user);
    let url:string = `https://euricom-vitarum-dev.herokuapp.com/#/resumes/public/${resume.userName.replace(/\s+/g, '-')}/${resume.id}`;
    let pdfUrl:string = `https://euricom-vitarum-dev.herokuapp.com/api/resumes/${resume.id}/download`;
    
    let fromAddress:string = 'test';
    let subject:string = `${resume.userName} might a match for your company!`
    let body:string = `
      Hello,
      
      ${resume.userName} might be the perfect match you're looking for. Please take a look at his resume.
      To see his/her resume in the browser click following link:
      ${url}
      Or to download a PDF copy of it, click this link:
      ${pdfUrl}
      
      Regards,
    `;
    
    this.mailService.openMailClient(fromAddress, subject, body);
  }
}

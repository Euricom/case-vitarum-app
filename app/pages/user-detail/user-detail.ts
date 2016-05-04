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
            console.log(resume);
            this.resumeList.push(resume);
          }
          
          console.log('length', this.resumeList.length);
        },
        err => console.log(err)
      );
  }
  
  previewResume(resume) {
    window.open(`https://euricom-vitarum-dev.herokuapp.com/#/resumes/public/${resume.userName.replace(/\s+/g, '-')}/${resume.id}`,'_blank', 'location=yes,enableviewportscale=yes'); 
  }
  
  sendResume(resume) {
    let url:string = `https://euricom-vitarum-dev.herokuapp.com/#/resumes/public/${resume.userName.replace(/\s+/g, '-')}/${resume.id}`;
    let pdfUrl:string = `https://euricom-vitarum-dev.herokuapp.com/api/resumes/${resume.id}/download`;
    
    let fromAddress:string = 'test';
    let subject:string = `${resume.userName} might be the perfect match for your company!`
    let body:string = `
      <p>Hello,</p>
      
      <p>${resume.userName} might be the perfect match you're looking for. Please take a look at his resume.
      To see his/her resume in the browser click following link:<p>
      <a href="${url}">${resume.name} - ${resume.userName}</a>
      
      <p>Or to download it as PDF, click this link:</p>
      <a href="${pdfUrl}">${resume.name} - ${resume.userName} PDF</a>
      
      <p>Regards,</p>
    `;
    
    this.mailService.openMailClient(fromAddress, subject, body);
  }
}

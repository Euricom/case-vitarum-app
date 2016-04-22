import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/employee-detail/employee-detail.html',
})

export class EmployeeDetailPage {
  employee;
  
  constructor(private nav: NavController, private navParams: NavParams) {
    console.log(navParams);
    this.employee = navParams.get('employee');
  }
}

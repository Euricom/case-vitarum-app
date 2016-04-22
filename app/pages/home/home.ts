import {Page, NavController, IonicApp} from 'ionic-angular';
import {EmployeeService} from '../../core/services/employee';
import {EmployeeDetailPage} from '../employee-detail/employee-detail';

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [EmployeeService]
})

export class HomePage {
  employeeList = [];
  filteredEmployees = [];
  
  constructor(private nav:NavController, private app:IonicApp, private employeeService: EmployeeService) {
    employeeService.getEmployees()
      .then((employees: any) => {
        for (let employee of employees) {
          this.employeeList.push(employee);
        }
        this.filteredEmployees = this.employeeList;
      });
  }
  
  filterList(event:any) {
      let query = event.target.value;

      this.filteredEmployees = this.employeeList.filter((employee) => {
          let fullName = employee.firstName + ' ' + employee.lastName;
          if (fullName.toLowerCase().indexOf(query.toLowerCase()) > -1) {
              return true;
          }
          return false;
      });
  }
  
  goToDetailPage(employee) {
    console.log('clicked this one:', employee);
    
    this.nav.push(EmployeeDetailPage, {
      employee: employee
    });
  }
}

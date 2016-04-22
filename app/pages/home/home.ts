import { Page, NavController } from 'ionic-angular';
//import employeeService from '../../core/services/employeeService';

@Page({
    templateUrl: 'build/pages/home/home.html',
})

export class HomePage {
    searchQuery:string = '';
    profilePage;
    employees = [];
    filteredEmployees = [];

    constructor(private nav:NavController) {
        this.employees = [
            {
                firstName: 'David',
                lastName: 'De Keersmaecker'
            },
            {
                firstName: 'Annelien',
                lastName: 'Kortleven'
            }
        ];

        this.filteredEmployees = this.employees;
    }

    filterList(event:any) {
        let query = event.target.value;

        this.filteredEmployees = this.employees.filter((employee) => {
            let fullName = employee.firstName + ' ' + employee.lastName;
            if (fullName.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                return true;
            }
            return false;
        });
    }
}

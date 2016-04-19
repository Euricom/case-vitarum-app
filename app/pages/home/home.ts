import { Page } from 'ionic-angular';
//import employeeService from '../../services/';

@Page({
  templateUrl: 'build/pages/home/home.html',
})

export class HomePage {
  searchQuery: string;
  employees: {
    firstName: string,
    lastName: string
  }[];

  constructor() {
    this.searchQuery = '';
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
  }
}

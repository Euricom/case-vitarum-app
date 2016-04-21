import { Page } from 'ionic-angular';
import { EmployeeListPage } from '../employee-list/employee-list';
import { ProfilePage } from '../profile/profile';

@Page({
    templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
    tab1 = EmployeeListPage;
    tab2 = ProfilePage;
    
    constructor() {
        console.log('init home', this.tab1);
    }
}

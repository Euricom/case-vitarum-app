import {Page, NavController, IonicApp} from 'ionic-angular';
import {UserService} from '../../core/services/users';
import {UserDetailPage} from '../user-detail/user-detail';

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [UserService]
})

export class HomePage {
  userList = [];
  filteredUserList = [];

  constructor(private nav: NavController, private app: IonicApp, private userService: UserService) {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
      results => {
        for (let user of results.users) {
          user.picture = user.picture.indexOf('/') === 0 ? user.picture.replace('/', '') : user.picture;
          this.userList.push(user);
        }
        this.filteredUserList = this.userList;
      },
      err => console.log(err)
      );
  }

  filterList(input: any) {
    let query = input.value;

    this.filteredUserList = this.userList.filter((user) => {
        if (user.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
            return true;
        }
        return false;
    });
  }

  goToDetailPage(user) {
    this.nav.push(UserDetailPage, {
      user: user
    });
  }
}

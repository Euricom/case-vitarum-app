import {Page, NavController, IonicApp, Loading} from 'ionic-angular';
import {UserService} from '../../core/services/users';
import {UserDetailPage} from '../user-detail/user-detail';
import {OrderBy} from '../../core/pipes/orderBy';

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [UserService],
  pipes: [OrderBy]
})

export class HomePage {
  userList = [];
  filteredUserList = [];
  loader;

  constructor(private nav: NavController, private app: IonicApp, private userService: UserService) {
    this.getUsers();
    
    this.loader = Loading.create({
      content: 'Loading employees...'
    });

    this.nav.present(this.loader);
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
        this.loader.dismiss();
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

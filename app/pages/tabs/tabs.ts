import {Page} from 'ionic-angular';
import {HomePage} from '../home/home';
import {ProfilePage} from '../profile/profile';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = ProfilePage;
}

import { Component } from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  showPeopleSub: boolean = false;
  showTransportSub: boolean = false;
  returnUrl: string;
  currentUser: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthenticationService,
    private menuCtrl: MenuController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logoutUser() {
      this.menuCtrl.close();
      this.authService.logout();
      this.router.navigate(['log-in']);
  }
  showPeopleSubMenu() {
    this.showPeopleSub = !this.showPeopleSub;
  }

  showTransportationSubMenu() {
    this.showTransportSub = !this.showTransportSub;
  }
}

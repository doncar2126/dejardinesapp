import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Principal',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Proyectos',
      url: '/projects',
      icon: 'list'
    },
    {
      title: 'Cerrar sesión',
      url: '/home',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public general:GeneralService,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if(localStorage.getItem("user_id") != null) {
        this.general.setDataUser();
        this.router.navigateByUrl('projects');
      }
    });
  }

  configCustomer() {
    this.menuCtrl.close();
    this.router.navigateByUrl('config-customer');
  }

  configUser() {
    this.menuCtrl.close();
    this.router.navigateByUrl('config-user');
  }

  logOut() {
    console.log("logOut");
    localStorage.clear();
  }
}

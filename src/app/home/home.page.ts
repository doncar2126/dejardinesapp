import { Component } from '@angular/core';
import { MenuController, LoadingController, ToastController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  constructor(
    public menuCtrl: MenuController,
    private router:Router,
    private authService:AuthService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public general:GeneralService
    ) {}

  auth = {
    auto:false,
    code:null,
    pass:null,
    user:null
  };
  
  ngOnInit() {
    if(localStorage.getItem("code") != null) {
      this.auth = {
        auto: true,
        code: localStorage.getItem("code"),
        pass: localStorage.getItem("pass"),
        user: localStorage.getItem("user")
      }
      this.loginAuth();
    } else {
      this.auth = {
        auto:false,
        code:null,
        pass:null,
        user:null
      };
    }
    this.menuCtrl.enable(false);
  }

  async showNotification(message, type) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color:type,
      animated:true,
      position:"top"
    });
    toast.present();
  }

  loginAuth() {
    if(this.auth.code != null && this.auth.user != null && this.auth.pass != null) {
      this.presentLoading();
      this.authService.auth(this.auth).subscribe(
        (response)=>{
          if(response['auth']) {
            localStorage.setItem("code", response['code']);
            localStorage.setItem("user", response['user']);
            localStorage.setItem("customer_id", response['customer_id']);
            localStorage.setItem("user_id", response['user_id']);
            localStorage.setItem("customer_name", response['customer_name']);
            localStorage.setItem("customer_db", response['customer_db']);
            localStorage.setItem("user_name", response['user_name']);
            localStorage.setItem("role_id", response['role_id']);

            this.general.setDataUser();

            this.router.navigate(["/projects"]);
          } else {
            this.showNotification("Usuario y contraseña incorrecta", "danger");
          }
        },
        (error)=>{
          console.log(error);
        }
      );
    } else {
      this.showNotification("Todos los datos son obligatorios", "danger");
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

}
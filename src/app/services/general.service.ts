import { Injectable } from '@angular/core';
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public home_user:boolean = true;

  public db: SQLiteObject;
  public isOpen: boolean;

  public user:any;
  public user_id:any;
  public user_name:any;

  public version = 0;

  constructor(
    public loadingController:LoadingController,
    public toastController: ToastController,
    private platform: Platform
  ) { }

  async notify(msg:string,type:string) {
    const toast = await this.toastController.create({
      message: msg,
      color: type,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  getFile(file) {
    var reader = new FileReader();
    return new Promise(function(resolve, reject){
      reader.onload = (function(theFile) {
        return function(e) {
          resolve(e.target.result);
        };
      })(file);
      reader.readAsDataURL(file);
    });
  }

  setDataUser() {
    this.user = localStorage.getItem("user");
    this.user_id = localStorage.getItem("user_id");
    this.user_name = localStorage.getItem("user_name");

    this.version = Date.parse(Date());
  }

}

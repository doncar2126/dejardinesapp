import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.models';
import { Platform, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { GeneralService } from '../services/general.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-user',
  templateUrl: './config-user.page.html',
  styleUrls: ['./config-user.page.scss'],
})
export class ConfigUserPage implements OnInit {

  public user:User = new User();

  imageResponse: any;
  options: any;
  currentPlatform:any;

  constructor(
    private http:HttpClient,
    public loadingController:LoadingController,
    public toastController: ToastController,
    private platform: Platform,
    private general:GeneralService,
    public actionSheetController: ActionSheetController,
    private imagePicker: ImagePicker,
    private router:Router,
    private camera: Camera
  ) { }

  ngOnInit() {
    this.getUserData();

    this.platform.ready().then(() => {
      if (this.platform.is('desktop')) {
        this.currentPlatform = true;
      } else {
        this.currentPlatform = false;
      }
    });
  }

  async getUserData() {
    const loading = await this.loadingController.create({
      message: 'Cargando datos'
    });

    loading.present();

    let user_id = localStorage.getItem("user_id");
    let code = localStorage.getItem("code");

    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.get(user_id).subscribe(
          (response)=>{
            this.user.username = response[0]['username'];
            this.user.code = code;
            this.user.user_name = response[0]['user_name'];
            this.user.user_mail = response[0]['user_mail'];
            this.user.user_cel = response[0]['user_cel'];
            this.user.profile_photo = "https://florayfauna.app/server/public/images/users/"+response[0]['profile_photo']+"?version="+this.general.version;

            loading.dismiss();
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        
      }
    });
  }

  async updateUser() {
    const loading = await this.loadingController.create({
      message: 'Guardando cambios'
    });
    
    await loading.present();

    let user_id = localStorage.getItem("user_id");
    
    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.save(this.user, user_id).subscribe(
          (response)=>{
            loading.dismiss();
            this.general.setDataUser();

            this.router.navigate(["/projects"]);
            this.general.notify("La información fue actualizada correctamente.", "success");
          },
          (error)=>{
            console.log(error);
            loading.dismiss();
            this.general.notify("Error al actualizar la información", "danger");
          });
      } else {

      }
    });
  }

  setImageBrowser(){
    let fileInput: any = document.getElementById("img-user");
    let files = fileInput.files[0];
    let imgPromise = this.general.getFile(files);

    imgPromise.then(blob => {
      this.user.profile_photo=blob;

    }).catch(e => console.log(e));
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Cargar imagen',
      buttons: [{
        text: 'Cargar desde galeria',
        icon: 'images',
        handler: () => {
          this.platform.ready().then(() => {
            if (this.platform.is('desktop')) {
    
            } else {
              this.setImage();
            }
    
          });
          
        }
      }, {
        text: 'Hacer una fotografia',
        icon: 'camera',
        handler: () => {
          this.takePhoto();
        }
      }]
    });
    await actionSheet.present();
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      targetWidth:600,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.user.profile_photo = (<any>window).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
     alert("error "+JSON.stringify(err))
    });

  }

  setImage() {
    this.options = {
      maximumImagesCount: 1,
      width: 600,
      quality: 100,
      outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.user.profile_photo='data:image/jpeg;base64,' + results[i];
      }
    }, (err) => {
      alert(err);
    });

  }

  get(user_id) : Observable<User[]> {
    return this.http.get<User[]>('https://florayfauna.app/server/public/api/user/get/'+user_id)
  }

  save(user:User, user_id) : Observable<boolean> {
    return this.http.post<boolean>("https://florayfauna.app/server/public/api/user/save/"+user_id, user)
  }

}

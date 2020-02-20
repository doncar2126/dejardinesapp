import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Zone } from '../models/zone.models';
import { ZoneService } from '../services/zone.service';
import { ToastController, ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { GeneralService } from '../services/general.service';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-new-zone',
  templateUrl: './new-zone.page.html',
  styleUrls: ['./new-zone.page.scss'],
})
export class NewZonePage {

  typeSquare = true;
  typeCirc = false;
  zone:Zone = new Zone();
  edit:any = false;

  imageResponse: any;
  options: any;
  project_id:any;

  currentPlatform:any;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    public zoneService:ZoneService,
    private general:GeneralService,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController,
    private platform: Platform,
    private camera: Camera,
    private imagePicker: ImagePicker
  ) { }

  ionViewWillEnter() {
    this.zone = this.zoneService.zone;
    this.edit = this.route.snapshot.paramMap.get("edit");
    this.project_id = this.route.snapshot.paramMap.get("project_id");

    this.zone.project_id = this.project_id;

    if(!this.edit) {
      this.zone = new Zone(null);
    }

    this.zone.id = this.route.snapshot.paramMap.get("zone_id");

    this.platform.ready().then(() => {
      if (this.platform.is('desktop')) {
        this.currentPlatform = true;
      } else {
        this.currentPlatform = false;
      }
    });

  }

  typezone($even) {
    if($even.target.value != 3) {
      this.typeSquare = true;
      this.typeCirc = false;
    } else {
      this.typeSquare = false;
      this.typeCirc = true;
    } 
  }

  validateCreate(edit_mode) {
    
    if(
      typeof this.zone.zone_code != "undefined" &&
      typeof this.zone.zone_name != "undefined" &&
      typeof this.zone.responsable_name_zone != "undefined" &&
      typeof this.zone.responsable_cel_zone != "undefined" &&
      typeof this.zone.responsable_mail_zone != "undefined"
      ) {
        this.zone.project_id = this.zoneService.zone.project_id;
        if(edit_mode) {
          this.edit = false;
          this.zoneService.saveEditZone(this.zone);
        } else {
          this.zoneService.createZone(this.zone);
        }
    } else {
      this.general.notify("Error, debe completar todos los campos", "danger");
    }
  }

  cancelCreationZone() {
    this.zone = new Zone(null);
    this.router.navigate(["/plot", {project_id:this.project_id}]);
  }

  async presentToast(msg:string,type:string) {
    const toast = await this.toastController.create({
      message: msg,
      color: type,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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
     this.zone.photo_zone = (<any>window).Ionic.WebView.convertFileSrc(imageData);
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
        this.zone.photo_zone='data:image/jpeg;base64,' + results[i];
      }
    }, (err) => {
      alert(err);
    });

  }

  setImageBrowser(){
    let fileInput: any = document.getElementById("img-project");
    let files = fileInput.files[0];
    let imgPromise = this.general.getFile(files);

    imgPromise.then(blob => {
      this.zone.photo_zone=blob;

    }).catch(e => console.log(e));
  }

}

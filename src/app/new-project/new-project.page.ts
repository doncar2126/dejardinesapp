import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Projects } from '../models/projects.models';
import { ProjectsService } from '../services/projects.service';
import { LoadingController, ToastController, ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.page.html',
  styleUrls: ['./new-project.page.scss'],
})
export class NewProjectPage implements OnInit {

  project:Projects = new Projects();
  project_edit:any = false;

  imageResponse: any;
  options: any;

  currentPlatform:any;
  image:any;

  constructor(
    private router:Router,
    private projectsService:ProjectsService,
    public loadingController:LoadingController,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private platform: Platform,
    private general:GeneralService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.project = this.projectsService.project;
    this.project.id = this.route.snapshot.paramMap.get("project_id");
    this.project_edit = this.route.snapshot.paramMap.get("project_edit");

    if(!this.project_edit) {
      this.project = new Projects(null);
    }

    this.platform.ready().then(() => {
      if (this.platform.is('desktop')) {
        this.currentPlatform = true;
      } else {
        this.currentPlatform = false;
      }
    });
  }

  validateCreate(edit_mode) {
    if(
      typeof this.project.name_project != "undefined" &&
      typeof this.project.project_country != "undefined" &&
      typeof this.project.project_department!= "undefined" &&
      typeof this.project.project_city != "undefined" &&
      typeof this.project.project_municipality != "undefined" &&
      typeof this.project.project_address != "undefined" &&
      typeof this.project.project_location != "undefined" &&
      typeof this.project.project_contact != "undefined" &&
      typeof this.project.project_phone != "undefined" &&
      typeof this.project.project_email != "undefined"
      ) {
        if(edit_mode) {
          this.project_edit = false;
          this.projectsService.saveEditProject(this.project);
        } else {
          this.projectsService.createProject(this.project);
        }
    } else {
      this.general.notify("Error, debe completar todos los campos", "danger");
    }
  }

  async createProject() {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });
    await loading.present();

    if(this.projectsService.saveLocal(this.project)){
      this.project = new Projects(null);
      loading.dismiss();
      this.general.notify("Proyecto guardado", "success");
      this.router.navigate(["/projects"]);
    } else {
      loading.dismiss();
      this.general.notify("Error al crear el proyecto", "danger");
    }
    
  }

  cancelCreationProject() {
    this.project = new Projects(null);
    this.router.navigate(["/projects"]);
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
     this.project.project_photo = (<any>window).Ionic.WebView.convertFileSrc(imageData);
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
        this.project.project_photo='data:image/jpeg;base64,' + results[i];
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
      this.project.project_photo=blob;

    }).catch(e => console.log(e));
  }

}

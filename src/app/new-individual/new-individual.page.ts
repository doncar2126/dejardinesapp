import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IndividualsFloraService } from '../services/individuals-flora.service';
import { ToastController, ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { GeneralService } from '../services/general.service';
import { IndividualsFlora } from '../models/individuals_flora.models';
import { CommonNames } from '../models/common_names.models';

@Component({
  selector: 'app-new-individual',
  templateUrl: './new-individual.page.html',
  styleUrls: ['./new-individual.page.scss'],
})
export class NewIndividualPage {

  individuals:IndividualsFlora = new IndividualsFlora;
  common_names:CommonNames = new CommonNames;

  edit:any = false;
  currentPlatform:any;
  imageResponse: any;
  options: any;

  id_plot_zone: any;
  id_common_name: any;
  parent_type: any;

  species:any;
  data_rel_species:any;

  code_individual:any;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private general:GeneralService,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController,
    private platform: Platform,
    private camera: Camera,
    private imagePicker: ImagePicker,
    public IndividualsFloraService:IndividualsFloraService
  ) { }

  ngOnInit() {
    this.individuals = this.IndividualsFloraService.individuals;
    this.IndividualsFloraService.individuals.id_plot_zone = this.route.snapshot.paramMap.get("id_plot_zone");
    this.IndividualsFloraService.individuals.parent_type = this.route.snapshot.paramMap.get("parent_type");

    this.IndividualsFloraService.individuals.code_individual = localStorage.getItem("user_id")+"-"+this.route.snapshot.paramMap.get("code");

    this.IndividualsFloraService.individuals.id_common_name = 1;

    this.code_individual = this.getIndividualCode();

    this.edit = this.route.snapshot.paramMap.get("edit");

    if(!this.edit) {
      this.individuals = new IndividualsFlora(null);
    }

    this.individuals.id = this.route.snapshot.paramMap.get("individuals_id");

    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.currentPlatform = true;
        this.IndividualsFloraService.getSpecies();
      } else {
        this.currentPlatform = false;
      }
    });

  }

  validateCreate(edit_mode) {
    this.individuals.id_plot_zone = this.IndividualsFloraService.individuals.id_plot_zone;
    this.individuals.id_common_name = this.IndividualsFloraService.individuals.id_common_name;
    this.individuals.parent_type = this.IndividualsFloraService.individuals.parent_type;
    if(
      typeof this.individuals.id_species != "undefined"
      ) {
        if(edit_mode) {
          console.log(edit_mode);
          this.edit = false;
          this.IndividualsFloraService.saveEditIndividualsFlora(this.individuals);
        } else {
          this.IndividualsFloraService.createIndividualsFlora(this.individuals);
        }
    } else {
      this.general.notify("Error, debe completar todos los campos", "danger");
    }
  }

  cancelCreationzone(project_id) {
    this.individuals = new IndividualsFlora(null);
    this.router.navigate(["/zone", {project_id:project_id}]);
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

  getIndividualCode() {
    let id_plot_zone = this.IndividualsFloraService.individuals.id_plot_zone;
    let user_id = localStorage.getItem('user_id');

    return "01"+"-"+id_plot_zone+"-0008";

    this.IndividualsFloraService.getCodeIndividual(id_plot_zone, user_id);
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
     this.individuals.photo_silhouette = (<any>window).Ionic.WebView.convertFileSrc(imageData);
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
        this.individuals.photo_silhouette='data:image/jpeg;base64,' + results[i];
      }
    }, (err) => {
      alert(err);
    });

  }

  setImageBrowser1(){
    let fileInput: any = document.getElementById("img-photo_silhouette");
    let files = fileInput.files[0];
    let imgPromise = this.general.getFile(files);

    imgPromise.then(blob => {
      this.individuals.photo_silhouette=blob;

    }).catch(e => console.log(e));
  }

  setImageBrowser2(){
    let fileInput: any = document.getElementById("img-photo_polite");
    let files = fileInput.files[0];
    let imgPromise = this.general.getFile(files);

    imgPromise.then(blob => {
      this.individuals.photo_polite=blob;

    }).catch(e => console.log(e));
  }

  setImageBrowser3(){
    let fileInput: any = document.getElementById("img-photo_leaves");
    let files = fileInput.files[0];
    let imgPromise = this.general.getFile(files);

    imgPromise.then(blob => {
      this.individuals.photo_leaves=blob;

    }).catch(e => console.log(e));
  }

  setImageBrowser4(){
    let fileInput: any = document.getElementById("img-photo_flowers");
    let files = fileInput.files[0];
    let imgPromise = this.general.getFile(files);

    imgPromise.then(blob => {
      this.individuals.photo_flowers=blob;

    }).catch(e => console.log(e));
  }

  setImageBrowser5(){
    let fileInput: any = document.getElementById("img-photo_fruits");
    let files = fileInput.files[0];
    let imgPromise = this.general.getFile(files);

    imgPromise.then(blob => {
      this.individuals.photo_fruits=blob;

    }).catch(e => console.log(e));
  }

  setImageBrowser6(){
    let fileInput: any = document.getElementById("img-photo_seeds");
    let files = fileInput.files[0];
    let imgPromise = this.general.getFile(files);

    imgPromise.then(blob => {
      this.individuals.photo_seeds=blob;

    }).catch(e => console.log(e));
  }

  cancelCreationIndividual(parent_type) {
    this.router.navigate(["/individuals", {parent_type:this.IndividualsFloraService.individuals.parent_type, id_plot_zone: this.IndividualsFloraService.individuals.id_plot_zone}]);
  }

  dataRelSpecies(e) {
    this.IndividualsFloraService.getDataRelSpecies(e.detail.value);
  }
  
  getPlotCode(id_plot_zone) {
    this.IndividualsFloraService.getPlotCode(id_plot_zone);
  }

  public getImage(): Promise<string> {

    return new Promise((resolve) => {

      const canvasEl: HTMLCanvasElement = document.createElement("canvas");
      let cx: CanvasRenderingContext2D = canvasEl.getContext('2d');

      let width = 300;
      let height = 300
      canvasEl.width = width;
      canvasEl.height = height;

      let input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.click();

      input.onchange = (event: any) => {
        var img = new Image;
        if (event.target.files && event.target.files.length > 0) {
          let file = event.target.files[0];
          let type = file.type;
          img.onload = () => {
            var iw = img.width;
            var ih = img.height;
            var scale = Math.min((width / iw), (height / ih));
            var iwScaled = iw * scale;
            var ihScaled = ih * scale;
            canvasEl.width = iwScaled;
            canvasEl.height = ihScaled;
            cx.drawImage(img, 0, 0, iwScaled, ihScaled);
            let imageBase64 = canvasEl.toDataURL(type);
            this.individuals.photo_silhouette
            //resolve(imageBase64);
          }
          //img.src = URL.createObjectURL(event.target.files[0]);
        }
      }

    });


  }

}

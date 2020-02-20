import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Plot } from '../models/plot.models';
import { PlotService } from '../services/plot.service';
import { ToastController, ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-new-plot',
  templateUrl: './new-plot.page.html',
  styleUrls: ['./new-plot.page.scss'],
})
export class NewPlotPage implements OnInit {

  typeSquare = true;
  typeCirc = false;
  plot:Plot = new Plot();
  edit:any = false;

  imageResponse: any;
  options: any;
  project_id:any;

  currentPlatform:any;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    public plotService:PlotService,
    private general:GeneralService,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController,
    private platform: Platform,
    private camera: Camera,
    private imagePicker: ImagePicker
  ) { }

  ngOnInit() {
    this.plot = this.plotService.plot;
    this.edit = this.route.snapshot.paramMap.get("edit");
    this.project_id = this.route.snapshot.paramMap.get("project_id");

    if(!this.edit) {
      this.plot = new Plot(null);
    }

    this.plot.id = this.route.snapshot.paramMap.get("plot_id");

    this.platform.ready().then(() => {
      if (this.platform.is('desktop')) {
        this.currentPlatform = true;
      } else {
        this.currentPlatform = false;
      }
    });
  }

  typePlot($even) {
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
      typeof this.plot.plot_code != "undefined" &&
      typeof this.plot.name_plot != "undefined" &&
      typeof this.plot.long_plot!= "undefined" &&
      typeof this.plot.wide_plot != "undefined" &&
      typeof this.plot.plot_length != "undefined" &&
      typeof this.plot.responsable_name_plot != "undefined" &&
      typeof this.plot.responsable_cel_plot != "undefined" &&
      typeof this.plot.responsable_mail_plot != "undefined"
      ) {
        this.plot.project_id = this.plotService.plot.project_id;
        if(edit_mode) {
          this.edit = false;
          this.plotService.saveEditPlot(this.plot);
        } else {
          this.plotService.createPlot(this.plot);
        }
    } else {
      this.general.notify("Error, debe completar todos los campos", "danger");
    }
  }

  cancelCreationPlot(project_id) {
    this.plot = new Plot(null);
    this.router.navigate(["/plot", {project_id:project_id}]);
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
     this.plot.photo_plot = (<any>window).Ionic.WebView.convertFileSrc(imageData);
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
        this.plot.photo_plot='data:image/jpeg;base64,' + results[i];
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
      this.plot.photo_plot=blob;

    }).catch(e => console.log(e));
  }

}

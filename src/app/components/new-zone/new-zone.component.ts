import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, LoadingController, NavParams } from '@ionic/angular';
import { PlotService } from '../../services/plot.service';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-new-zone',
  templateUrl: './new-zone.component.html',
  styleUrls: ['./new-zone.component.scss']
})
export class NewZoneComponent implements OnInit {

  project_id:any;

  constructor(
    private router:Router,
    public popover:PopoverController,
    public navParams:NavParams,
    public plotService:PlotService,
    public zoneService:ZoneService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  newZone() {
    this.popover.dismiss();
    this.project_id = this.navParams.get('project_id');
    this.zoneService.zone.project_id = this.navParams.get('project_id');
    this.router.navigate(["/new-zone", {project_id:this.project_id}]);
  }

  newPlot() {
    this.popover.dismiss();
    this.project_id = this.navParams.get('project_id');
    this.plotService.plot.project_id = this.navParams.get('project_id');
    this.router.navigate(["/new-plot", {project_id:this.project_id}]);
  }

  newHabitat() {
    this.popover.dismiss();
    this.router.navigate(["/new-habitat"]);
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

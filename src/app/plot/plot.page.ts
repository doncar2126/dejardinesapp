import { Component, OnInit } from '@angular/core';
import { LoadingController, PopoverController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { PlotService } from '../services/plot.service';
import { ZoneService } from '../services/zone.service';
import { NewZoneComponent } from '../components/new-zone/new-zone.component';
import { ActionsPlotComponent } from '../components/actions-plot/actions-plot.component';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.page.html',
  styleUrls: ['./plot.page.scss'],
})
export class PlotPage {

  plot_list = [];
  zone_list = [];
  public searchTerm: string = "";

  constructor(
    private router:Router,
    public popoverController: PopoverController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private route: ActivatedRoute,
    public plotService:PlotService,
    public zoneService:ZoneService
  ) {}

  ionViewWillEnter() {
    this.plotService.plot.project_id = this.route.snapshot.paramMap.get("project_id");
    this.zoneService.zone.project_id = this.route.snapshot.paramMap.get("project_id");
    this.plot();
    //this.zone();
  }

  async newZonePopover(ev: any) {
    const popover = await this.popoverController.create({
      component: NewZoneComponent,
      event: ev,
      translucent: true,
      componentProps:{project_id:this.plotService.plot.project_id}
    });
    return await popover.present();
  }

  individual(parent_type, id_plot_zone) {
    this.router.navigate(["/individuals", {parent_type:parent_type, id_plot_zone:id_plot_zone}]);
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

  plot() {
    this.plotService.getPlot();
  }

  zone() {
    this.zoneService.getZone();
  }

  async showActions(ev: Event, id, project_id, set_type) {
    console.log(project_id);
    const popover = await this.popoverController.create({
      component: ActionsPlotComponent,
      event: ev,
      translucent: true,
      componentProps:{project_id:project_id,id:id,set_type:set_type}
    });
    return await popover.present();
  }

  setFilteredItems() {
    this.plotService.setFilter(this.searchTerm, this.route.snapshot.paramMap.get("project_id"));
  }

}

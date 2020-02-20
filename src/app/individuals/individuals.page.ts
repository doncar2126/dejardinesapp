import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, PopoverController, ToastController, IonInfiniteScroll, IonContent } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { IndividualsFloraService } from '../services/individuals-flora.service';
import { NewZoneComponent } from '../components/new-zone/new-zone.component';
import { ActionsIndividualComponent } from '../components/actions-individual/actions-individual.component';

@Component({
  selector: 'app-individuals',
  templateUrl: './individuals.page.html',
  styleUrls: ['./individuals.page.scss'],
})
export class IndividualsPage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;

  public searchTerm: string = "";
  public parent_type:string = "";

  public all:any = false;

  public list:number = 20;

  constructor(
    private router:Router,
    public popoverController: PopoverController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private route: ActivatedRoute,
    public IndividualsFloraService:IndividualsFloraService
  ) { }

  detailIndividual(id) {
    this.IndividualsFloraService.detailsIndividual(id);
  }

  newIndividual() {
    this.router.navigate(["/new-individual", {
      parent_type:this.IndividualsFloraService.individuals.parent_type, 
      id_plot_zone:this.IndividualsFloraService.individuals.id_plot_zone
    }]);
  }

  ionViewWillEnter() {
    this.IndividualsFloraService.individuals.id_plot_zone = this.route.snapshot.paramMap.get("id_plot_zone");
    this.IndividualsFloraService.individuals.parent_type = this.route.snapshot.paramMap.get("parent_type");
    this.parent_type = this.route.snapshot.paramMap.get("parent_type");

    this.all = this.route.snapshot.paramMap.get("all");

    
    if(this.all) {
      this.getAllIndividualsFlora();
    } else {
      this.getIndividualsFlora();
    }
  }

  verifyAll() {
    if(this.all) {
      return false;
    } else {
      return true;
    }
  }

  async newZonePopover(ev: any) {
    const popover = await this.popoverController.create({
      component: NewZoneComponent,
      event: ev,
      translucent: true,
      componentProps:{id_plot_zone:this.IndividualsFloraService.individuals.id_plot_zone}
    });
    return await popover.present();
  }

  individual() {
    this.router.navigate(["/individuals"]);
    this.presentLoading();
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

  getIndividualsFlora() {
    this.IndividualsFloraService.getIndividualsFlora(false);
  }

  getAllIndividualsFlora() {
    this.IndividualsFloraService.getAllIndividualsFlora(this.list);
  }

  async showActions(ev: Event, id, id_plot_zone, parent_type) {
    const popover = await this.popoverController.create({
      component: ActionsIndividualComponent,
      event: ev,
      translucent: true,
      componentProps:{id:id, id_plot_zone:id_plot_zone, parent_type:parent_type}
    });
    return await popover.present();
  }

  setFilteredItems() {
    this.IndividualsFloraService.setFilter(this.searchTerm, this.route.snapshot.paramMap.get("project_id"));
  }

  loadData(event, current, total) {
      event.target.complete();
      this.list += 20;
      this.IndividualsFloraService.getAllIndividualsFlora(this.list);

      if (current == total) {
        event.target.disabled = true;
      }

  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  scrollTop() {
    console.log("Top");
    this.content.scrollToBottom(500);
  }

}

import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, PopoverController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProjectsService } from '../services/projects.service';
import { ActionsProjectComponent } from '../components/actions-project/actions-project.component';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  projects_list = [];
  public searchTerm: string = "";

  constructor(
    public menuCtrl: MenuController,
    private router:Router,
    public loadingController: LoadingController,
    public popoverController: PopoverController,
    public toastController: ToastController,
    public projectsService:ProjectsService,
    private general:GeneralService
    ) {}

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.general.home_user = false;
  }

  ionViewWillEnter() {
    this.projects();
  }

  plot(project_id) {
    this.router.navigate(["/plot", {project_id:project_id}]);
  }

  async projects() {
      this.projectsService.getProjects();
  }

  newProject() {
    this.router.navigate(["/new-project"]);
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

  async showActions(ev: Event, id) {
    const popover = await this.popoverController.create({
      component: ActionsProjectComponent,
      event: ev,
      translucent: true,
      componentProps:{id:id}
    });
    return await popover.present();
  }

  setFilteredItems() {
    this.projectsService.getProjectFilter(this.searchTerm);
  }

}

import { Component, OnInit } from '@angular/core';
import { NavParams, LoadingController } from '@ionic/angular';
import { ProjectsService } from '../../services/projects.service';


@Component({
  selector: 'app-actions-project',
  templateUrl: './actions-project.component.html',
  styleUrls: ['./actions-project.component.scss']
})
export class ActionsProjectComponent implements OnInit {

  project_id:0;

  constructor(
    public navParams:NavParams,
    private projectsService:ProjectsService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.project_id = this.navParams.get('id');
  }

  delete() {
    let project_id = this.navParams.get('id');
    this.projectsService.deleteProject(project_id);
  }

  editProject() {
    this.project_id = this.navParams.get('id');
    this.projectsService.editProject(this.project_id);
  }

}

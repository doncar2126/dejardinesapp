import { Component, OnInit } from '@angular/core';
import { NavParams, LoadingController } from '@ionic/angular';
import { IndividualsFloraService } from '..//../services/individuals-flora.service';

@Component({
  selector: 'app-actions-individual',
  templateUrl: './actions-individual.component.html',
  styleUrls: ['./actions-individual.component.scss']
})
export class ActionsIndividualComponent implements OnInit {

  constructor(
    public navParams:NavParams,
    public loadingController: LoadingController,
    public IndividualsFloraService:IndividualsFloraService
  ) { }

  ngOnInit() {
  }

  delete() {
    let id = this.navParams.get('id');
    let parent_type = this.navParams.get('parent_type');
    let id_plot_zone = this.navParams.get('id_plot_zone');

    this.IndividualsFloraService.individuals.id_plot_zone = id_plot_zone;
    this.IndividualsFloraService.individuals.parent_type = parent_type;

    this.IndividualsFloraService.deleteIndividualsFlora(id);
     
  }

  edit() {
    let id = this.navParams.get('id');
    let parent_type = this.navParams.get('parent_type');
    let id_plot_zone = this.navParams.get('id_plot_zone');

    this.IndividualsFloraService.individuals.id_plot_zone = id_plot_zone;
    this.IndividualsFloraService.individuals.parent_type = parent_type;

    this.IndividualsFloraService.editIndividualsFlora(id);

  }

}

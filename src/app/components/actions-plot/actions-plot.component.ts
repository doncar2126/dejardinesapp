import { Component, OnInit } from '@angular/core';
import { NavParams, LoadingController } from '@ionic/angular';
import { PlotService } from '../../services/plot.service';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-actions-plot',
  templateUrl: './actions-plot.component.html',
  styleUrls: ['./actions-plot.component.scss']
})
export class ActionsPlotComponent implements OnInit {

  constructor(
    public navParams:NavParams,
    public loadingController: LoadingController,
    public zoneService:ZoneService,
    public plotService:PlotService
  ) { }

  ngOnInit() {
  }

  delete() {
    let project_id = this.navParams.get('project_id');
    let id = this.navParams.get('id');
    let set_type = this.navParams.get('set_type');

    console.log(project_id);
    this.plotService.plot.project_id = project_id;

    if(set_type == "plot") {
      this.plotService.deletePlot(id);
    }

    if(set_type == "zone") {
      this.zoneService.deleteZone(id)
    }   
  }

  edit() {
    let project_id = this.navParams.get('project_id');
    let id = this.navParams.get('id');
    let set_type = this.navParams.get('set_type');

    this.plotService.plot.project_id = project_id;

    if(set_type == "plot") {
      this.plotService.editPlot(id, project_id);
    }

    if(set_type == "zone") {
      this.zoneService.editZone(id, project_id);
    }
  }

}

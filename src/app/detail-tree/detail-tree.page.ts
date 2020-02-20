import { Component, OnInit } from '@angular/core';
import { IndividualsFloraService } from '../services/individuals-flora.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { IndividualsFlora } from '../models/individuals_flora.models';
import { CommonNames } from '../models/common_names.models';

@Component({
  selector: 'app-detail-tree',
  templateUrl: './detail-tree.page.html',
  styleUrls: ['./detail-tree.page.scss'],
})
export class DetailTreePage implements OnInit {
  individuals:IndividualsFlora = new IndividualsFlora;

  constructor(
    private general:GeneralService,
    private route: ActivatedRoute,
    public IndividualsFloraService:IndividualsFloraService
  ) { }

  ngOnInit() {
    this.individuals = this.IndividualsFloraService.individuals;
  }

}

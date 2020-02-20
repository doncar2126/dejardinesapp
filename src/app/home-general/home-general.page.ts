import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IndividualsFloraService } from '../services/individuals-flora.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home-general',
  templateUrl: './home-general.page.html',
  styleUrls: ['./home-general.page.scss'],
})
export class HomeGeneralPage implements OnInit {

  constructor(
    private barcodeScanner: BarcodeScanner,
    public IndividualsFloraService:IndividualsFloraService,
    public menuCtrl: MenuController,
    private router:Router
    ) { }

  ngOnInit() {
    //this.menuCtrl.enable(false);
    //this.mostView();
  }

  ionViewWillEnter() {
    this.mostView();
  }

  list() {
    this.router.navigate(["/individuals", {"all":true}]);
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData.text);
      if(barcodeData.text != "") {
        this.IndividualsFloraService.detailsGeneralIndividual(barcodeData.text);
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }

  mostView() {
    this.IndividualsFloraService.mostView();
  }

  detailIndividual(id) {
    this.IndividualsFloraService.detailsIndividual(id);
  }
  

}

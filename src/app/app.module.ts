import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { NewZoneComponent } from './components/new-zone/new-zone.component';
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx'
import { SQLite } from '@ionic-native/sqlite/ngx';

import { ActionsProjectComponent } from './components/actions-project/actions-project.component';
import { ActionsPlotComponent } from './components/actions-plot/actions-plot.component';
import { ActionsIndividualComponent } from './components/actions-individual/actions-individual.component';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  declarations: [AppComponent, NewZoneComponent, ActionsProjectComponent, ActionsPlotComponent, ActionsIndividualComponent],
  entryComponents: [
    NewZoneComponent,
    ActionsProjectComponent,
    ActionsPlotComponent,
    ActionsIndividualComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [ 
    ActionsProjectComponent,
    ActionsPlotComponent,
    ActionsIndividualComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    SQLite,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
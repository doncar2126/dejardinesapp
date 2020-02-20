import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Platform, LoadingController, PopoverController } from '@ionic/angular';

import { Zone } from '../models/zone.models';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
import { GeneralService } from './general.service';
import { PlotService } from './plot.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  public zones = [];
  public zone:Zone = new Zone();
  public status_create: boolean = true;

  constructor(
    private http:HttpClient,
    private storage: SQLite,
    public loadingController: LoadingController,
    private popoverCtrl: PopoverController,
    private platform: Platform,
    private router:Router,
    private general:GeneralService,
    public plot:PlotService
  ) {
    this.platform.ready().then(() => {

      if (this.platform.is('desktop')) {
        
      } else {
        //this.openDB();
      }

    });
   }

   openDB() {
    if(!this.general.isOpen){
      this.storage = new SQLite();
      this.storage.create({ name: "data.db", location:"default" }).then((db:SQLiteObject) => {
        this.general.db = db;
        this.general.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  async createZone(data) {
    const loading = await this.loadingController.create({
      message: 'Creando parcela'
    });
    
    await loading.present();

    let customer_id = localStorage.getItem("customer_id");
    
    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.save(data, customer_id).subscribe(
          (response)=>{
            loading.dismiss();
            this.general.notify("Zona guardada", "success");
            this.router.navigate(["/plot", {project_id:data.project_id}]);
          },
          (error)=>{
            console.log(error);
            loading.dismiss();
            this.general.notify("Error al crear la parcela", "danger");
          });
      } else {
        this.saveLocal(data).then((result: any) => {
          loading.dismiss();
          this.general.notify("Zona guardada", "success");
          this.router.navigate(["/plot", {project_id:data.project_id}]);
        }, (error) => {
          if(error['rowsAffected'] > 0) {
            this.general.notify("Parcela guardada", "success");
          } else {
            this.general.notify("Error al crear la parcela", "danger");
          } 
          loading.dismiss();
          this.router.navigate(["/plot", {project_id:data.project_id}]);
        });
    }
  });
  }

  async getZone() {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });

    loading.present();

    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.get().subscribe(
          (response)=>{
            this.zones = response;
            loading.dismiss();
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        this.getLocal().then((data: any) => {
          this.zones = data;
          loading.dismiss();
        }, (error) => {
          console.log(error);
          loading.dismiss();
        })
      }

    });
  }

  async editZone(id, project_id) {
    this.popoverCtrl.dismiss();
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });

    loading.present();

    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.getId(id).subscribe(
          (response)=>{
            this.zone.zone_code = response[0]['zone_code'];
            this.zone.zone_name = response[0]['zone_name'];
            this.zone.project_id = response[0]['project_id'];
            this.zone.zone_area_m2 = response[0]['zone_area_m2'];
            this.zone.altitude_zone = response[0]['altitude_zone'];
            this.zone.coordinate_zone_x = response[0]['coordinate_zone_x'];
            this.zone.coordinate_zone_y = response[0]['coordinate_zone_y'];
            this.zone.latitude_zone = response[0]['latitude_zone'];
            this.zone.zone_length = response[0]['zone_length'];
            this.zone.id_life_zone = response[0]['id_life_zone'];
            this.zone.responsable_name_zone = response[0]['responsable_name_zone'];
            this.zone.responsable_cel_zone = response[0]['responsable_cel_zone'];
            this.zone.responsable_mail_zone = response[0]['responsable_mail_zone'];
            this.zone.observations_zone = response[0]['observations_zone'];
            this.zone.photo_zone = "https://florayfauna.app/server/public/images/zones/"+response[0]['photo_zone'];
            this.zone.zone_status = response[0]['zone_status'];
            this.zone.zone_timestamp = response[0]['zone_timestamp'];

            this.router.navigate(["/new-zone", {zone_id:id,project_id:project_id, edit:true}]);
            setTimeout(()=>{
              loading.dismiss();
            }, 500);
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        this.getLocalId(id).then((response: any) => {
          this.zone.zone_code = response[0]['zone_code'];
          this.zone.zone_name = response[0]['zone_name'];
          this.zone.zone_area_m2 = response[0]['zone_area_m2'];
          this.zone.project_id = response[0]['project_id'];
          this.zone.altitude_zone = response[0]['altitude_zone'];
          this.zone.coordinate_zone_x = response[0]['coordinate_zone_x'];
          this.zone.coordinate_zone_y = response[0]['coordinate_zone_y'];
          this.zone.latitude_zone = response[0]['latitude_zone'];
          this.zone.zone_length = response[0]['zone_length'];
          this.zone.id_life_zone = response[0]['id_life_zone'];
          this.zone.responsable_name_zone = response[0]['responsable_name_zone'];
          this.zone.responsable_cel_zone = response[0]['responsable_cel_zone'];
          this.zone.responsable_mail_zone = response[0]['responsable_mail_zone'];
          this.zone.observations_zone = response[0]['observations_zone'];
          this.zone.photo_zone = response[0]['photo_zone'];
          this.zone.zone_status = response[0]['zone_status'];
          this.zone.zone_timestamp = response[0]['zone_timestamp'];
          
          this.router.navigate(["/new-zone", {zone_id:id,project_id:this.zone.project_id, edit:true}]);
            setTimeout(()=>{
              loading.dismiss();
            }, 500);
        }, (error) => {
          console.log(error);
        })
      }

    });
  }

  async saveEditZone(data) {
    const loading = await this.loadingController.create({
      message: "Guardando cambios"
    });

    loading.present();

    let customer_id = localStorage.getItem("customer_id");
    
    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.save(data, customer_id).subscribe(
          (response)=>{
            this.getZone();
            this.router.navigate(["/plot", {project_id:data.project_id}]);
            this.general.notify("Proyecto guardado", "success");
            loading.dismiss();
          },
          (error)=>{
            console.log(error);
            this.general.notify("Error al editar el proyecto", "danger");
            loading.dismiss();
          });
      } else {
        this.updateLocal(data).then((response: any) => {
          this.general.notify("Proyecto guardado", "success");
          this.router.navigate(["/plot", {project_id:data.project_id}]);
        }, (error) => {
          if(error['rowsAffected'] > 0) {
            this.general.notify("Proyecto guardado", "success");
          } else {
            this.general.notify("Error al editar el proyecto", "danger");
          }
          this.router.navigate(["/plot", {project_id:data.project_id}]);
        })
        loading.dismiss();
    }
  });
  }

  async deleteZone(id) {
    this.popoverCtrl.dismiss();
    const loading = await this.loadingController.create({
      message: 'Eliminando'
    });
    
    await loading.present();
    
    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.delete(id).subscribe(
          (response)=>{
            this.plot.getPlot();
            loading.dismiss();
          },
          (error)=>{
            console.log(error);
          });
      } else {
        this.deleteLocal(id).then((data: any) => {
          loading.dismiss();
        }, (error) => {
          if(error['rowsAffected'] > 0) {
            this.general.notify("Zona eliminada", "success");
            this.plot.getPlot();
          } else {
            this.general.notify("Error al eliminar la zona", "danger");
          } 
          loading.dismiss();
        })
    }
  });
  }

  async setFilter(search, project_id){
    this.popoverCtrl.dismiss();
    const loading = await this.loadingController.create({
      message: 'Filtrando'
    });
    
    await loading.present();

    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.getFilter(search, project_id).subscribe(
          (response)=>{
            this.zones = response;
            loading.dismiss();
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        this.getLocalFilter(search, project_id).then((data: any) => {
          this.zones = data;
          loading.dismiss();
        }, (error) => {
          console.log(error);
        })
      }

    });
  }

  save(zone:Zone, customer_id) : Observable<boolean> {
    return this.http.post<boolean>("https://florayfauna.app/server/public/api/zone/save/"+customer_id, zone)
  }
  
  get() : Observable<Zone[]> {
    return this.http.get<Zone[]>('https://florayfauna.app/server/public/api/zone/get/project/'+this.zone.project_id)
  }

  getFilter(search, project_id) : Observable<Zone[]> {
    search = search == "" ? 0 : search;
    return this.http.get<Zone[]>('https://florayfauna.app/server/public/api/zone/filter/'+search+'/'+project_id)
  }

  getId(id) : Observable<Zone[]> {
    return this.http.get<Zone[]>('https://florayfauna.app/server/public/api/zone/get/'+id)
  }

  delete(id) : Observable<boolean>  {
    return this.http.delete<boolean>("https://florayfauna.app/server/public/api/zone/delete/"+id)
  }

  saveLocal(zone){
    return new Promise ((resolve, reject) => {    
        this.general.db.executeSql('INSERT INTO zone (\n\
          project_id,\n\
          zone_code,\n\
          zone_name,\n\
          zone_area_m2,\n\
          altitude_zone,\n\
          coordinate_zone_x,\n\
          coordinate_zone_y,\n\
          latitude_zone,\n\
          zone_length,\n\
          id_life_zone,\n\
          responsable_name_zone,\n\
          responsable_cel_zone,\n\
          responsable_mail_zone,\n\
          observations_zone,\n\
          photo_zone) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
          zone.project_id,
          zone.zone_code,
          zone.zone_name,
          zone.zone_area_m2,
          zone.altitude_zone,
          zone.coordinate_zone_x,
          zone.coordinate_zone_y,
          zone.latitude_zone,
          zone.zone_length,
          zone.id_life_zone,
          zone.responsable_name_zone,
          zone.responsable_cel_zone,
          zone.responsable_mail_zone,
          zone.observations_zone,
          zone.photo_zone
        ])
          .then(response => resolve(response))
          .catch(error => {console.log(error); reject(error)});
    });
  }

  updateLocal(zone){
    return new Promise ((resolve, reject) => {
      let sql = 'UPDATE zone SET\n\
      zone_code=?,\n\
      zone_name=?,\n\
      zone_area_m2=?,\n\
      altitude_zone=?,\n\
      coordinate_zone_x=?,\n\
      coordinate_zone_y=?,\n\
      latitude_zone=?,\n\
      zone_length=?,\n\
      id_life_zone=?,\n\
      responsable_name_zone=?,\n\
      responsable_cel_zone=?,\n\
      responsable_mail_zone=?,\n\
      observations_zone=?,\n\
      photo_zone=?\n\
      WHERE rowid=?';

      this.general.db.executeSql(sql, [
        zone.zone_code,
        zone.zone_name,
        zone.zone_area_m2,
        zone.altitude_zone,
        zone.coordinate_zone_x,
        zone.coordinate_zone_y,
        zone.latitude_zone,
        zone.zone_length,
        zone.id_life_zone,
        zone.responsable_name_zone,
        zone.responsable_cel_zone,
        zone.responsable_mail_zone,
        zone.observations_zone,
        zone.photo_zone,
        zone.id
      ]).then(response => resolve(response))
      .catch(error => {console.log(error); reject(error)});
      });
  }

  getLocal(){
    return new Promise ((resolve, reject) => {
      this.general.db.executeSql("SELECT rowid, * FROM zone WHERE project_id =? ORDER BY rowid DESC", [this.zone.project_id]).then((data) => {
        let dataArray = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            dataArray.push({
              id: data.rows.item(i).rowid,
              zone_name: data.rows.item(i).zone_name,
              zone_code: data.rows.item(i).zone_code,
              zone_area_m2: data.rows.item(i).zone_area_m2,
              altitude_zone: data.rows.item(i).altitude_zone,
              coordinate_zone_x: data.rows.item(i).coordinate_zone_x,
              coordinate_zone_y: data.rows.item(i).coordinate_zone_y,
              latitude_zone: data.rows.item(i).latitude_zone,
              zone_length: data.rows.item(i).zone_length,
              id_life_zone: data.rows.item(i).id_life_zone,
              responsable_name_zone: data.rows.item(i).responsable_name_zone,
              responsable_cel_zone: data.rows.item(i).responsable_cel_zone,
              responsable_mail_zone: data.rows.item(i).responsable_mail_zone,
              observations_zone: data.rows.item(i).observations_zone,
              photo_zone: data.rows.item(i).photo_zone,
              zone_timestamp: data.rows.item(i).zone_timestamp
            });             
          }          
        }
        resolve(dataArray);
      }, (error) => {
        reject(error);
      })
    })
  }

  getLocalFilter(search, project_id){
    return new Promise ((resolve, reject) => {
      this.general.db.executeSql("SELECT rowid, * FROM zone WHERE (name_zone LIKE '%"+search+"%' OR zone_code LIKE '%"+search+"%' OR observations_zone LIKE '%"+search+"%') AND project_id = '"+project_id+"' ORDER BY rowid DESC", []).then((data) => {
        let projectsArray = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            projectsArray.push({
              id: data.rows.item(i).rowid,
              name_project: data.rows.item(i).name_project,
              project_address: data.rows.item(i).project_address,
              project_country: data.rows.item(i).project_country,
              project_department: data.rows.item(i).project_department,
              project_city: data.rows.item(i).project_city,
              project_municipality: data.rows.item(i).project_municipality,
              project_location: data.rows.item(i).project_location,
              project_phone: data.rows.item(i).project_phone,
              project_contact: data.rows.item(i).project_contact,
              project_cel: data.rows.item(i).project_cel,
              project_email: data.rows.item(i).project_email,
              project_photo: data.rows.item(i).project_photo
              
            });            
          }          
        }
        resolve(projectsArray);
      }, (error) => {
        reject(error);
      })
    })
  }

  getLocalId(id){
    return new Promise ((resolve, reject) => {
      this.general.db.executeSql("SELECT rowid, * FROM zone WHERE rowid = '"+id+"'", []).then((data) => {
        let dataArray = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            dataArray.push({
              id: data.rows.item(i).rowid,
              zone_name: data.rows.item(i).zone_name,
              zone_code: data.rows.item(i).zone_code,
              project_id: data.rows.item(i).project_id,
              zone_area_m2: data.rows.item(i).zone_area_m2,
              altitude_zone: data.rows.item(i).altitude_zone,
              coordinate_zone_x: data.rows.item(i).coordinate_zone_x,
              coordinate_zone_y: data.rows.item(i).coordinate_zone_y,
              latitude_zone: data.rows.item(i).latitude_zone,
              zone_length: data.rows.item(i).zone_length,
              id_life_zone: data.rows.item(i).id_life_zone,
              responsable_name_zone: data.rows.item(i).responsable_name_zone,
              responsable_cel_zone: data.rows.item(i).responsable_cel_zone,
              responsable_mail_zone: data.rows.item(i).responsable_mail_zone,
              observations_zone: data.rows.item(i).observations_zone,
              photo_zone: data.rows.item(i).photo_zone,
              zone_timestamp: data.rows.item(i).zone_timestamp
            });            
          }          
        }
        resolve(dataArray);
      }, (error) => {
        reject(error);
      })
    })
  }

  deleteLocal(id){
    return new Promise ((resolve, reject) => {
      let sql = 'DELETE FROM zone WHERE rowid = "'+id+'"';
      this.general.db.executeSql(sql).then((data) =>{
        this.getZone();
      }, (error) => {
        reject(error);
      });
    });
  }

}

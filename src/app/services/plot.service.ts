import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Platform, LoadingController, PopoverController } from '@ionic/angular';

import { Plot } from '../models/plot.models';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class PlotService {
  public plots = [];
  public plot:Plot = new Plot();
  public status_create: boolean = true;
  public project_id: any;

  constructor(
    private http:HttpClient,
    private storage: SQLite,
    public loadingController: LoadingController,
    private popoverCtrl: PopoverController,
    private platform: Platform,
    private router:Router,
    private general:GeneralService
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

  async createPlot(data) {
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
            this.general.notify("Parcela guardada", "success");
            this.router.navigate(["/plot", {project_id:data.project_id}]);
          },
          (error)=>{
            console.log(error);
            loading.dismiss();
            this.general.notify("Error al crear la parcela", "danger");
          });
      } else {
        this.saveLocal(data).then((response: any) => {
          loading.dismiss();
          this.general.notify("Parcela guardada", "success");
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

  async getPlot() {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });

    loading.present();

    let customer_id = localStorage.getItem("customer_id");

    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.get(customer_id).subscribe(
          (response)=>{
            this.plots = response;
            loading.dismiss();
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        this.getLocal().then((data: any) => {
          this.plots = data;
          loading.dismiss();
        }, (error) => {
          console.log(error);
          loading.dismiss();
        })
      }

    });
  }

  async editPlot(id, project_id) {
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
            this.plot.plot_code = response[0]['plot_code'];
            this.plot.name_plot = response[0]['name_plot'];
            this.plot.project_id = response[0]['project_id'];
            this.plot.id_plot_form = response[0]['id_plot_form']
            this.plot.long_plot = response[0]['long_plot'];
            this.plot.wide_plot = response[0]['wide_plot'];
            this.plot.plot_diameter = response[0]['plot_diameter'];
            this.plot.radio_plot = response[0]['radio_plot'];
            this.plot.altitude_plot = response[0]['altitude_plot'];
            this.plot.coordinate_plot_x = response[0]['coordinate_plot_x'];
            this.plot.coordinate_plot_y = response[0]['coordinate_plot_y'];
            this.plot.latitude_plot = response[0]['latitude_plot'];
            this.plot.plot_length = response[0]['plot_length'];
            this.plot.id_life_zone = response[0]['id_life_zone'];
            this.plot.responsable_name_plot = response[0]['responsable_name_plot'];
            this.plot.responsable_cel_plot = response[0]['responsable_cel_plot'];
            this.plot.responsable_mail_plot = response[0]['responsable_mail_plot'];
            this.plot.observations_plot = response[0]['observations_plot'];
            this.plot.photo_plot = "https://florayfauna.app/server/public/images/plots/"+response[0]['photo_plot'];
            this.plot.plot_status = response[0]['plot_status'];
            this.plot.plot_timestamp = response[0]['plot_timestamp'];

            this.router.navigate(["/new-plot", {plot_id:id,project_id:project_id, edit:true}]);
            setTimeout(()=>{
              loading.dismiss();
            }, 500);
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        this.getLocalId(id).then((response: any) => {
          this.plot.plot_code = response[0]['plot_code'];
          this.plot.name_plot = response[0]['name_plot'];
          this.plot.project_id = response[0]['project_id'];
          this.plot.id_plot_form = response[0]['id_plot_form']
          this.plot.long_plot = response[0]['long_plot'];
          this.plot.wide_plot = response[0]['wide_plot'];
          this.plot.plot_diameter = response[0]['plot_diameter'];
          this.plot.radio_plot = response[0]['radio_plot'];
          this.plot.altitude_plot = response[0]['altitude_plot'];
          this.plot.coordinate_plot_x = response[0]['coordinate_plot_x'];
          this.plot.coordinate_plot_y = response[0]['coordinate_plot_y'];
          this.plot.latitude_plot = response[0]['latitude_plot'];
          this.plot.plot_length = response[0]['plot_length'];
          this.plot.id_life_zone = response[0]['id_life_zone'];
          this.plot.responsable_name_plot = response[0]['responsable_name_plot'];
          this.plot.responsable_cel_plot = response[0]['responsable_cel_plot'];
          this.plot.responsable_mail_plot = response[0]['responsable_mail_plot'];
          this.plot.observations_plot = response[0]['observations_plot'];
          this.plot.photo_plot = response[0]['photo_plot'];
          this.plot.plot_status = response[0]['plot_status'];
          this.plot.plot_timestamp = response[0]['plot_timestamp'];
          
          this.router.navigate(["/new-plot", {plot_id:id,project_id:this.plot.project_id, edit:true}]);
            setTimeout(()=>{
              loading.dismiss();
            }, 500);
        }, (error) => {
          console.log(error);
        })
      }

    });
  }

  async saveEditPlot(data) {
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
            this.getPlot();
            this.router.navigate(["/plot", {project_id:data.project_id}]);
            this.general.notify("Proyecto guardado", "success");
            loading.dismiss();
          },
          (error)=>{
            console.log(error);
            this.general.notify("Error al editar el proyecto", "danger");
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

  async deletePlot(id) {
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
            this.getPlot();
            loading.dismiss();
          },
          (error)=>{
            console.log(error);
          });
      } else {
        this.deleteLocal(id).then((data: any) => {
          this.getPlot(); 
          loading.dismiss();
        }, (error) => {
          if(error['rowsAffected'] > 0) {
            this.general.notify("Proyecto eliminado", "success");
          } else {
            this.general.notify("Error al eliminar el proyecto", "danger");
          }
          this.getPlot();  
          loading.dismiss();
        })
    }
  });
  }

  async setFilter(search, project_id){
    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.getFilter(search, project_id).subscribe(
          (response)=>{
            this.plots = response;
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        this.getLocalFilter(search, project_id).then((data: any) => {
          this.plots = data;
        }, (error) => {
          console.log(error);
        })
      }

    });
  }

  save(plot:Plot, customer_id) : Observable<boolean> {
    return this.http.post<boolean>("https://florayfauna.app/server/public/api/plot/save/"+customer_id, plot)
  }
  
  get(customer_id) : Observable<Plot[]> {
    return this.http.get<Plot[]>('https://florayfauna.app/server/public/api/plot/get/project/'+this.plot.project_id)
  }

  getFilter(search, project_id) : Observable<Plot[]> {
    search = search == "" ? 0 : search;
    return this.http.get<Plot[]>('https://florayfauna.app/server/public/api/plot/filter/'+search+'/'+project_id)
  }

  getId(id) : Observable<Plot[]> {
    return this.http.get<Plot[]>('https://florayfauna.app/server/public/api/plot/get/'+id)
  }

  delete(id) : Observable<boolean>  {
    return this.http.delete<boolean>("https://florayfauna.app/server/public/api/plot/delete/"+id)
  }

  saveLocal(plot){
    console.log(plot);
    return new Promise ((resolve, reject) => {    
        this.general.db.executeSql('INSERT INTO plot (\n\
          project_id,\n\
          plot_code,\n\
          name_plot,\n\
          id_plot_form,\n\
          long_plot,\n\
          wide_plot,\n\
          plot_diameter,\n\
          radio_plot,\n\
          altitude_plot,\n\
          coordinate_plot_x,\n\
          coordinate_plot_y,\n\
          latitude_plot,\n\
          plot_length,\n\
          id_life_zone,\n\
          responsable_name_plot,\n\
          responsable_cel_plot,\n\
          responsable_mail_plot,\n\
          observations_plot,\n\
          photo_plot) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
          plot.project_id,
          plot.plot_code,
          plot.name_plot,
          plot.id_plot_form,
          plot.long_plot,
          plot.wide_plot,
          plot.plot_diameter,
          plot.radio_plot,
          plot.altitude_plot,
          plot.coordinate_plot_x,
          plot.coordinate_plot_y,
          plot.latitude_plot,
          plot.plot_length,
          plot.id_life_zone,
          plot.responsable_name_plot,
          plot.responsable_cel_plot,
          plot.responsable_mail_plot,
          plot.observations_plot,
          plot.photo_plot
        ])
          .then(response => resolve(response))
          .catch(error => {console.log(error); reject(error)});
    });
  }

  updateLocal(plot){
    return new Promise ((resolve, reject) => {
      let sql = 'UPDATE plot SET\n\
      plot_code=?,\n\
      name_plot=?,\n\
      long_plot=?,\n\
      wide_plot=?,\n\
      plot_diameter=?,\n\
      radio_plot=?,\n\
      altitude_plot=?,\n\
      coordinate_plot_x=?,\n\
      coordinate_plot_y=?,\n\
      latitude_plot=?,\n\
      plot_length=?,\n\
      id_life_zone=?,\n\
      responsable_name_plot=?,\n\
      responsable_cel_plot=?,\n\
      responsable_mail_plot=?,\n\
      observations_plot=?,\n\
      photo_plot=?\n\
      WHERE rowid=?';

      this.general.db.executeSql(sql, [
        plot.plot_code,
        plot.name_plot,
        plot.long_plot,
        plot.wide_plot,
        plot.plot_diameter,
        plot.radio_plot,
        plot.altitude_plot,
        plot.coordinate_plot_x,
        plot.coordinate_plot_y,
        plot.latitude_plot,
        plot.plot_length,
        plot.id_life_zone,
        plot.responsable_name_plot,
        plot.responsable_cel_plot,
        plot.responsable_mail_plot,
        plot.observations_plot,
        plot.photo_plot,
        plot.id
      ]).then(response => resolve(response))
      .catch(error => {console.log(error); reject(error)});
      });
  }

  getLocal(){
    console.log(this.plot.project_id);
    return new Promise ((resolve, reject) => {
      let dataArray = [];
      this.general.db.executeSql("SELECT rowid, * FROM plot WHERE project_id =? ORDER BY rowid DESC", [this.plot.project_id]).then((data) => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            dataArray.push({
              id: data.rows.item(i).rowid,
              project_id: data.rows.item(i).project_id,
              name_plot: data.rows.item(i).name_plot,
              plot_code: data.rows.item(i).plot_code,
              id_plot_form: data.rows.item(i).id_plot_form,
              long_plot: data.rows.item(i).long_plot,
              wide_plot: data.rows.item(i).wide_plot,
              radio_plot: data.rows.item(i).radio_plot,
              altitude_plot: data.rows.item(i).altitude_plot,
              coordinate_plot_x: data.rows.item(i).coordinate_plot_x,
              coordinate_plot_y: data.rows.item(i).coordinate_plot_y,
              latitude_plot: data.rows.item(i).latitude_plot,
              plot_length: data.rows.item(i).plot_length,
              id_life_zone: data.rows.item(i).id_life_zone,
              responsable_name_plot: data.rows.item(i).responsable_name_plot,
              responsable_cel_plot: data.rows.item(i).responsable_cel_plot,
              responsable_mail_plot: data.rows.item(i).responsable_mail_plot,
              observations_plot: data.rows.item(i).observations_plot,
              photo_plot: data.rows.item(i).photo_plot,
              set_type: "plot",
              plot_timestamp: data.rows.item(i).plot_timestamp
            });             
          }          
        }
      }, (error) => {
        reject(error);
      })
      this.general.db.executeSql("SELECT rowid, * FROM zone WHERE project_id =? ORDER BY rowid DESC", [this.plot.project_id]).then((data) => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            dataArray.push({
              id: data.rows.item(i).rowid,
              project_id: data.rows.item(i).project_id,
              zone_name: data.rows.item(i).zone_name,
              zone_code: data.rows.item(i).zone_code,
              id_life_zone: data.rows.item(i).id_life_zone,
              latitude_zone: data.rows.item(i).latitude_zone,
              coordinate_zone_x: data.rows.item(i).coordinate_zone_x,
              coordinate_zone_y: data.rows.item(i).coordinate_zone_y,
              latitude_plot: data.rows.item(i).latitude_plot,
              altitude_zone: data.rows.item(i).altitude_zone,
              responsable_name_zone: data.rows.item(i).responsable_name_zone,
              responsable_cel_zone: data.rows.item(i).responsable_cel_zone,
              responsable_mail_zone: data.rows.item(i).responsable_mail_zone,
              zone_area_m2: data.rows.item(i).zone_area_m2,
              zone_length: data.rows.item(i).zone_length,
              observations_zone: data.rows.item(i).observations_zone,
              photo_zone: data.rows.item(i).photo_zone,
              set_type: "zone",
              zone_timestamp: data.rows.item(i).zone_timestamp
            });             
          }          
        }
      }, (error) => {
        reject(error);
      });
      console.log(dataArray);
      resolve(dataArray);
    })
  }

  getLocalFilter(search, project_id){
    return new Promise ((resolve, reject) => {
      this.general.db.executeSql("SELECT rowid, * FROM plot WHERE (name_plot LIKE '%"+search+"%' OR plot_code LIKE '%"+search+"%' OR observations_plot LIKE '%"+search+"%') AND project_id = '"+project_id+"' ORDER BY rowid DESC", []).then((data) => {
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
      this.general.db.executeSql("SELECT rowid, * FROM plot WHERE rowid = '"+id+"'", []).then((data) => {
        let dataArray = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            dataArray.push({
              id: data.rows.item(i).rowid,
              project_id: data.rows.item(i).project_id,
              name_plot: data.rows.item(i).name_plot,
              plot_code: data.rows.item(i).plot_code,
              id_plot_form: data.rows.item(i).id_plot_form,
              long_plot: data.rows.item(i).long_plot,
              wide_plot: data.rows.item(i).wide_plot,
              radio_plot: data.rows.item(i).radio_plot,
              altitude_plot: data.rows.item(i).altitude_plot,
              coordinate_plot_x: data.rows.item(i).coordinate_plot_x,
              coordinate_plot_y: data.rows.item(i).coordinate_plot_y,
              latitude_plot: data.rows.item(i).latitude_plot,
              plot_length: data.rows.item(i).plot_length,
              id_life_zone: data.rows.item(i).id_life_zone,
              responsable_name_plot: data.rows.item(i).responsable_name_plot,
              responsable_cel_plot: data.rows.item(i).responsable_cel_plot,
              responsable_mail_plot: data.rows.item(i).responsable_mail_plot,
              observations_plot: data.rows.item(i).observations_plot,
              photo_plot: data.rows.item(i).photo_plot,
              plot_timestamp: data.rows.item(i).plot_timestamp
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
      let sql = 'DELETE FROM plot WHERE rowid = "'+id+'"';
      this.general.db.executeSql(sql).then((data) =>{
        this.getPlot();
      }, (error) => {
        reject(error);
      });
    });
  }

}

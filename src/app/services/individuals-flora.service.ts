import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Platform, LoadingController, PopoverController } from '@ionic/angular';

import { IndividualsFlora } from '../models/individuals_flora.models';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
import { GeneralService } from './general.service';
import { PlotService } from './plot.service';

@Injectable({
  providedIn: 'root'
})
export class IndividualsFloraService {
  public individuals_flora = [];
  public individuals:IndividualsFlora = new IndividualsFlora();
  public status_create: boolean = true;

  public individial_empty = false;

  public species_list:any;
  public data_species:any;

  constructor(
    private http:HttpClient,
    private storage: SQLite,
    public loadingController: LoadingController,
    private popoverCtrl: PopoverController,
    private platform: Platform,
    private router:Router,
    private general:GeneralService,
    private plot:PlotService
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

  async createIndividualsFlora(data) {
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
            this.general.notify("Individuo guardado", "success");
            this.router.navigate(["/individuals", {parent_type:data.parent_type, id_plot_zone:data.id_plot_zone}]);
          },
          (error)=>{
            console.log(error);
            loading.dismiss();
            this.general.notify("Error al crear el individuo", "danger");
          });
      } else {
        this.saveLocal(data).then((result: any) => {
          loading.dismiss();
          this.general.notify("Individuo guardada", "success");
          this.router.navigate(["/plot", {project_id:data.project_id}]);
        }, (error) => {
          if(error['rowsAffected'] > 0) {
            this.general.notify("Individuo guardada", "success");
          } else {
            this.general.notify("Error al crear el Individuo", "danger");
          } 
          loading.dismiss();
          this.router.navigate(["/plot", {project_id:data.project_id}]);
        });
    }
  });
  }

  async getIndividualsFlora(edit) {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });

    loading.present();

    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.get(edit).subscribe(
          (response)=>{
            this.individuals_flora = response;
            loading.dismiss();
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        this.getLocal().then((data: any) => {
          this.individuals_flora = data;
          loading.dismiss();
        }, (error) => {
          console.log(error);
          loading.dismiss();
        })
      }

    });
  }

  async getAllIndividualsFlora(list) {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });

    loading.present();

    this.platform.ready().then(() => {
        this.getAll(list).subscribe(
          (response)=>{
            this.individuals_flora = response;
            loading.dismiss();
          },
          (error)=>{
            console.log(error);
          });
    });
  }

  async detailsGeneralIndividual(id) {
    this.popoverCtrl.dismiss();
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });

    loading.present();

    this.platform.ready().then(() => {
        this.getId(id).subscribe(
          (response)=>{
            this.individuals.id_plot_zone = response[0]['id_plot_zone'];
            this.individuals.parent_type = response[0]['parent_type'];
            this.individuals.id_species = response[0]['id_species'];
            this.individuals.id_common_name = response[0]['id_common_name'];
            this.individuals.common_name = response[0]['common_name']['common_name'];
            this.individuals.family_name = response[0]['familie']['family_name'];
            this.individuals.diameter_dap = response[0]['diameter_dap'];
            this.individuals.circumference_cap = response[0]['circumference_cap'];
            this.individuals.commercial_height = response[0]['commercial_height'];
            this.individuals.total_height = response[0]['total_height'];
            this.individuals.cup_height = response[0]['cup_height'];
            this.individuals.cup_diameter_y = response[0]['cup_diameter_y'];
            this.individuals.cup_diameter_x = response[0]['cup_diameter_x'];
            this.individuals.color_flower = response[0]['color_flower'];
            this.individuals.fruit_color = response[0]['fruit_color'];
            this.individuals.observations = response[0]['observations'];
            this.individuals.id_related_zone = response[0]['id_related_zone'];
            this.individuals.id_related_individual = response[0]['id_related_individual'];
            this.individuals.photo_silhouette = response[0]['photo_silhouette'];
            this.individuals.photo_polite = response[0]['photo_polite'];
            this.individuals.photo_leaves = response[0]['photo_leaves'];
            this.individuals.photo_flowers = response[0]['photo_flowers'];
            this.individuals.photo_fruits = response[0]['photo_fruits'];
            this.individuals.photo_seeds = response[0]['photo_seeds'];
            this.individuals.individuals_status = response[0]['individuals_status'];
            this.individuals.individuals_create = response[0]['individuals_create'];
            this.individuals.individuals_timestamp = response[0]['individuals_timestamp'];

            this.router.navigate(["/detail-tree", {individuals_id:id}]);
            setTimeout(()=>{
              loading.dismiss();
            }, 500);
          },
          (error)=>{
            console.log(error);
          });

    });
  }

  async editIndividualsFlora(id) {
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
            this.individuals.id_plot_zone = response[0]['id_plot_zone'];
            this.individuals.parent_type = response[0]['parent_type'];
            this.individuals.id_species = response[0]['id_species'];
            this.individuals.id_common_name = response[0]['id_common_name'];
            this.individuals.common_name = response[0]['common_name']['common_name'];
            this.individuals.family_name = response[0]['familie']['family_name'];
            this.individuals.diameter_dap = response[0]['diameter_dap'];
            this.individuals.circumference_cap = response[0]['circumference_cap'];
            this.individuals.commercial_height = response[0]['commercial_height'];
            this.individuals.total_height = response[0]['total_height'];
            this.individuals.cup_height = response[0]['cup_height'];
            this.individuals.cup_diameter_y = response[0]['cup_diameter_y'];
            this.individuals.cup_diameter_x = response[0]['cup_diameter_x'];
            this.individuals.color_flower = response[0]['color_flower'];
            this.individuals.fruit_color = response[0]['fruit_color'];
            this.individuals.observations = response[0]['observations'];
            this.individuals.id_related_zone = response[0]['id_related_zone'];
            this.individuals.id_related_individual = response[0]['id_related_individual'];
            this.individuals.photo_silhouette = "https://florayfauna.app/server/public/images/individuals/"+response[0]['photo_silhouette'];
            this.individuals.photo_polite = "https://florayfauna.app/server/public/images/individuals/"+response[0]['photo_polite'];
            this.individuals.photo_leaves = "https://florayfauna.app/server/public/images/individuals/"+response[0]['photo_leaves'];
            this.individuals.photo_flowers = "https://florayfauna.app/server/public/images/individuals/"+response[0]['photo_flowers'];
            this.individuals.photo_fruits = "https://florayfauna.app/server/public/images/individuals/"+response[0]['photo_fruits'];
            this.individuals.photo_seeds = "https://florayfauna.app/server/public/images/individuals/"+response[0]['photo_seeds'];
            this.individuals.individuals_status = response[0]['individuals_status'];
            this.individuals.individuals_create = response[0]['individuals_create'];
            this.individuals.individuals_timestamp = response[0]['individuals_timestamp'];

            this.router.navigate(["/new-individual", {individuals_id:id,id_plot_zone:this.individuals.id_plot_zone,parent_type:this.individuals.parent_type,edit:true}]);
            setTimeout(()=>{
              loading.dismiss();
            }, 500);
          },
          (error)=>{
            console.log(error);
          });
        
      } else { 
        this.getLocalId(id).then((response: any) => {
            this.individuals.id_plot_zone = response[0]['id_plot_zone'];
            this.individuals.parent_type = response[0]['parent_type'];
            this.individuals.id_species = response[0]['id_species'];
            this.individuals.id_common_name = response[0]['id_common_name'];
            this.individuals.diameter_dap = response[0]['diameter_dap'];
            this.individuals.circumference_cap = response[0]['circumference_cap'];
            this.individuals.commercial_height = response[0]['commercial_height'];
            this.individuals.total_height = response[0]['total_height'];
            this.individuals.cup_height = response[0]['cup_height'];
            this.individuals.cup_diameter_y = response[0]['cup_diameter_y'];
            this.individuals.cup_diameter_x = response[0]['cup_diameter_x'];
            this.individuals.color_flower = response[0]['color_flower'];
            this.individuals.fruit_color = response[0]['fruit_color'];
            this.individuals.observations = response[0]['observations'];
            this.individuals.id_related_zone = response[0]['id_related_zone'];
            this.individuals.id_related_individual = response[0]['id_related_individual'];
            this.individuals.photo_silhouette = response[0]['photo_silhouette'];
            this.individuals.photo_polite = response[0]['photo_polite'];
            this.individuals.photo_leaves = response[0]['photo_leaves'];
            this.individuals.photo_flowers = response[0]['photo_flowers'];
            this.individuals.photo_fruits = response[0]['photo_fruits'];
            this.individuals.photo_seeds = response[0]['photo_seeds'];
            this.individuals.individuals_status = response[0]['individuals_status'];
            this.individuals.individuals_create = response[0]['individuals_create'];
            this.individuals.individuals_timestamp = response[0]['individuals_timestamp'];
          
          this.router.navigate(["/new-individual", {individuals_id:id,id_plot_zone:this.individuals.id_plot_zone, edit:true}]);
            setTimeout(()=>{
              loading.dismiss();
            }, 500);
        }, (error) => {
          console.log(error);
        })
      }

    });
  }

  async detailsIndividual(id) {
    this.popoverCtrl.dismiss();
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });

    loading.present();

    this.platform.ready().then(() => {
      if (true) {
        this.getId(id).subscribe(
          (response)=>{
            this.individial_empty = response[0]['empty'];
            if(response[0]['empty'] != true) {
              this.individuals.id = response[0]['id'];
              this.individuals.id_plot_zone = response[0]['id_plot_zone'];
              this.individuals.parent_type = response[0]['parent_type'];
              this.individuals.id_species = response[0]['id_species'];
              this.individuals.id_common_name = response[0]['id_common_name'];
              this.individuals.common_name = response[0]['common_name']['common_name'];
              this.individuals.family_name = response[0]['familie']['family_name'];
              this.individuals.diameter_dap = response[0]['diameter_dap'];
              this.individuals.circumference_cap = response[0]['circumference_cap'];
              this.individuals.commercial_height = response[0]['commercial_height'];
              this.individuals.total_height = response[0]['total_height'];
              this.individuals.cup_height = response[0]['cup_height'];
              this.individuals.cup_diameter_y = response[0]['cup_diameter_y'];
              this.individuals.cup_diameter_x = response[0]['cup_diameter_x'];
              this.individuals.color_flower = response[0]['color_flower'];
              this.individuals.fruit_color = response[0]['fruit_color'];
              this.individuals.observations = response[0]['observations'];
              this.individuals.id_related_zone = response[0]['id_related_zone'];
              this.individuals.id_related_individual = response[0]['id_related_individual'];
              this.individuals.photo_silhouette = response[0]['photo_silhouette'] != null ? response[0]['photo_silhouette'] : "";
              this.individuals.photo_polite = response[0]['photo_polite'] != null ? response[0]['photo_polite'] : "";
              this.individuals.photo_leaves = response[0]['photo_leaves'] != null ? response[0]['photo_leaves'] : "";
              this.individuals.photo_flowers = response[0]['photo_flowers'] != null ? response[0]['photo_flowers'] : "";
              this.individuals.photo_fruits =  response[0]['photo_fruits'] != null ? response[0]['photo_fruits'] : "";
              this.individuals.photo_seeds =response[0]['photo_seeds'] != null ? response[0]['photo_seeds'] : "";
              this.individuals.individuals_status = response[0]['individuals_status'];
              this.individuals.individuals_create = response[0]['individuals_create'];
              this.individuals.individuals_timestamp = response[0]['individuals_timestamp'];
            }

            this.setView(id).subscribe(
              (response)=>{
    
              },
              (error)=>{
                console.log(error);
              });

            this.router.navigate(["/detail-tree", {individuals_id:id}]);
            setTimeout(()=>{
              loading.dismiss();
            }, 500);
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        this.getLocalId(id).then((response: any) => {
            this.individuals.id_plot_zone = response[0]['id_plot_zone'];
            this.individuals.parent_type = response[0]['parent_type'];
            this.individuals.id_species = response[0]['id_species'];
            this.individuals.id_common_name = response[0]['id_common_name'];
            this.individuals.diameter_dap = response[0]['diameter_dap'];
            this.individuals.circumference_cap = response[0]['circumference_cap'];
            this.individuals.commercial_height = response[0]['commercial_height'];
            this.individuals.total_height = response[0]['total_height'];
            this.individuals.cup_height = response[0]['cup_height'];
            this.individuals.cup_diameter_y = response[0]['cup_diameter_y'];
            this.individuals.cup_diameter_x = response[0]['cup_diameter_x'];
            this.individuals.color_flower = response[0]['color_flower'];
            this.individuals.fruit_color = response[0]['fruit_color'];
            this.individuals.observations = response[0]['observations'];
            this.individuals.id_related_zone = response[0]['id_related_zone'];
            this.individuals.id_related_individual = response[0]['id_related_individual'];
            this.individuals.photo_silhouette = response[0]['photo_silhouette'];
            this.individuals.photo_polite = response[0]['photo_polite'];
            this.individuals.photo_leaves = response[0]['photo_leaves'];
            this.individuals.photo_flowers = response[0]['photo_flowers'];
            this.individuals.photo_fruits = response[0]['photo_fruits'];
            this.individuals.photo_seeds = response[0]['photo_seeds'];
            this.individuals.individuals_status = response[0]['individuals_status'];
            this.individuals.individuals_create = response[0]['individuals_create'];
            this.individuals.individuals_timestamp = response[0]['individuals_timestamp'];
          
          this.router.navigate(["/new-individual", {individuals_id:id,id_plot_zone:this.individuals.id_plot_zone, edit:true}]);
            setTimeout(()=>{
              loading.dismiss();
            }, 500);
        }, (error) => {
          console.log(error);
        })
      }

    });
  }

  async getCodeIndividual(id_plot_zone, user_id) {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });

    loading.present();

    
  }

  async saveEditIndividualsFlora(data) {
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
            this.getIndividualsFlora(true);
            this.general.notify("Individuo guardado", "success");
            this.router.navigate(["/individuals", {parent_type:data.parent_type, id_plot_zone:data.id_plot_zone}]);
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

  async deleteIndividualsFlora(id) {
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
            this.getIndividualsFlora(false);
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

  async getSpecies() {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });

    loading.present();

    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.species().subscribe(
          (response)=>{
            loading.dismiss();
            this.species_list = response;
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        this.getLocal().then((data: any) => {
          this.individuals_flora = data;
          loading.dismiss();
        }, (error) => {
          console.log(error);
          loading.dismiss();
        })
      }

    });
  }

  async getDataRelSpecies(id) {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });

    loading.present();

    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.dataRelSpecies(id).subscribe(
          (response)=>{
            loading.dismiss();
            this.individuals.common_name = response[0]['common_name'];
            this.individuals.family_name = response[0]['family_name'];
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        this.getLocal().then((data: any) => {
          this.individuals_flora = data;
          loading.dismiss();
        }, (error) => {
          console.log(error);
          loading.dismiss();
        })
      }

    });
  }

  async getPlotCode(id_plot_zone) {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });

    loading.present();

    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.getPlotCodeSevice(id_plot_zone).subscribe(
          (response)=>{
            loading.dismiss();
            this.individuals.common_name = response[0]['common_name'];
            this.individuals.family_individual = response[0]['family_name'];
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        this.getLocal().then((data: any) => {
          this.individuals_flora = data;
          loading.dismiss();
        }, (error) => {
          console.log(error);
          loading.dismiss();
        })
      }

    });
  }

  async setFilter(search, project_id){
    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.getFilter(search).subscribe(
          (response)=>{
            this.individuals_flora = response;
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        this.getLocalFilter(search, project_id).then((data: any) => {
          this.individuals_flora = data;
        }, (error) => {
          console.log(error);
        })
      }

    });
  }

  setView(id) {
    return this.http.post<boolean>("https://florayfauna.app/server/public/api/individuals_flora/setView", id)
  }

  async mostView() {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });

    loading.present();

    this.platform.ready().then(() => {
      if (this.platform.is('desktop')) {
        this.getMostView().subscribe(
          (response)=>{
            this.individuals_flora = response;
            loading.dismiss();
          },
          (error)=>{
            console.log(error);
          });
        } else {
          this.getMostViewLocal().then((data: any) => {
            this.individuals_flora = data;
          }, (error) => {
            console.log(error);
          })
        }
    });
  }

  save(individual:IndividualsFlora, customer_id) : Observable<boolean> {
    return this.http.post<boolean>("https://florayfauna.app/server/public/api/individuals_flora/save/"+customer_id, individual)
  }
  
  get(edit) : Observable<IndividualsFlora[]> {
    return this.http.get<IndividualsFlora[]>('https://florayfauna.app/server/public/api/individuals_flora/get/'+this.individuals.parent_type+'/'+this.individuals.id_plot_zone+'/'+edit);
  }

  getAll(list) : Observable<IndividualsFlora[]> {
    return this.http.get<IndividualsFlora[]>('https://florayfauna.app/server/public/api/individuals_flora/getAll/'+list);
  }

  getFilter(search) : Observable<IndividualsFlora[]> {
    search = search == "" ? 0 : search;
    return this.http.get<IndividualsFlora[]>('https://florayfauna.app/server/public/api/individuals_flora/filter/'+search)
  }

  getId(id) : Observable<IndividualsFlora[]> {
    return this.http.get<IndividualsFlora[]>('https://florayfauna.app/server/public/api/individuals_flora/get/'+id)
  }

  delete(id) : Observable<boolean>  {
    return this.http.delete<boolean>("https://florayfauna.app/server/public/api/individuals_flora/delete/"+id)
  }

  species():Observable<any> {
    return this.http.get<any>('https://florayfauna.app/server/public/api/species/get');
  }

  dataRelSpecies(id):Observable<any> {
    return this.http.get<any>('https://florayfauna.app/server/public/api/species/data_rel_species/'+id);
  }

  getPlotCodeSevice(id):Observable<any> {
    return this.http.get<any>('https://florayfauna.app/server/public/api/plot/get_code/'+id);
  }

  getMostView() : Observable<IndividualsFlora[]> {
    return this.http.get<IndividualsFlora[]>('https://florayfauna.app/server/public/api/individuals_flora/getMostView');
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
      this.general.db.executeSql("SELECT rowid, * FROM zone WHERE project_id =? ORDER BY rowid DESC", [this.individuals.id_plot_zone]).then((data) => {
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

  getMostViewLocal(){
    return new Promise ((resolve, reject) => {
      this.general.db.executeSql("SELECT rowid, * FROM zone WHERE project_id =? ORDER BY rowid DESC", [this.individuals.id_plot_zone]).then((data) => {
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

  getLocalFilter(search, id_plot_zone){
    return new Promise ((resolve, reject) => {
      this.general.db.executeSql("SELECT rowid, * FROM zone WHERE (name_zone LIKE '%"+search+"%' OR zone_code LIKE '%"+search+"%' OR observations_zone LIKE '%"+search+"%') AND id_plot_zone = '"+id_plot_zone+"' ORDER BY rowid DESC", []).then((data) => {
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
        this.getIndividualsFlora(false);
      }, (error) => {
        reject(error);
      });
    });
  }

}

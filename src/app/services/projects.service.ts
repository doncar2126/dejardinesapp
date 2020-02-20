import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Platform, LoadingController, PopoverController } from '@ionic/angular';

import { Projects } from '../models/projects.models';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  public projects = [];
  public project:Projects = new Projects();
  public status_create: boolean = true;

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
        //this.createDB();
      }

    });
    
  }

  createDB() {
    if(!this.general.isOpen){
      this.storage = new SQLite();
      this.storage.create({ name: "data.db", location:"default" }).then((db:SQLiteObject) => {
        this.general.db = db;
        //db.executeSql("DELETE FROM projects", []);
        this.general.db.executeSql("CREATE TABLE projects (rowid INTEGER PRIMARY KEY,\n\
          name_project,\n\
          project_address,\n\
          project_country,\n\
          project_department,\n\
          project_city,\n\
          project_municipality,\n\
          project_location,\n\
          project_phone,\n\
          project_contact,\n\
          project_email,\n\
          project_photo,\n\
          project_status\n\
          )", []);
          //this.general.db.executeSql("DROP TABLE plot");
          this.general.db.executeSql("CREATE TABLE plot (rowid INTEGER PRIMARY KEY,\n\
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
            photo_plot\n\
            )", []);
          //this.general.db.executeSql("DROP TABLE zone");
          this.general.db.executeSql("CREATE TABLE zone (rowid INTEGER PRIMARY KEY,\n\
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
          photo_zone\n\
        )", []);
        this.general.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  async createProject(project) {
    const loading = await this.loadingController.create({
      message: 'Creando projecto'
    });
    
    await loading.present();

    let customer_id = localStorage.getItem("customer_id");
    
    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.save(project, customer_id).subscribe(
          (response)=>{
            this.getProjects();
            loading.dismiss();
            this.general.notify("Proyecto guardado", "success");
            this.router.navigate(["/projects"]);
          },
          (error)=>{
            console.log(error);
            loading.dismiss();
            this.general.notify("Error al crear el proyecto", "danger");
          });
      } else {
        this.saveLocal(project).then((data: any) => {
          this.getProjects(); 
          loading.dismiss();
          this.general.notify("Proyecto guardado", "success");
          this.router.navigate(["/projects"]);
        }, (error) => {
          if(error['rowsAffected'] > 0) {
            this.general.notify("Proyecto guardado", "success");
          } else {
            this.general.notify("Error al crear el proyecto", "danger");
          }
          this.getProjects();  
          loading.dismiss();
          this.router.navigate(["/projects"]);
        })
    }
  });
  }

  async getProjects() {
    const loading = await this.loadingController.create({
      message: 'Cargando proyectos'
    });

    loading.present();

    let customer_id = localStorage.getItem("customer_id");

    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.get(customer_id).subscribe(
          (response)=>{
            this.projects = response;
            loading.dismiss();
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        this.getLocal().then((data: any) => {
          this.projects = data;
          loading.dismiss();
        }, (error) => {
          console.log(error);
        })
      }

    });
  }

  async editProject(project_id) {
    this.popoverCtrl.dismiss();
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });

    loading.present();

    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.getProject(project_id).subscribe(
          (response)=>{
            this.project.name_project = response[0]['name_project'];
            this.project.project_country = response[0]['project_country'];
            this.project.project_department = response[0]['project_department']
            this.project.project_city = response[0]['project_city'];
            this.project.project_municipality = response[0]['project_municipality'];
            this.project.project_address = response[0]['project_address'];
            this.project.project_location = response[0]['project_location'];
            this.project.project_contact = response[0]['project_contact'];
            this.project.project_phone = response[0]['project_phone'];
            this.project.project_email = response[0]['project_email'];
            this.project.project_photo = "https://florayfauna.app/server/public/images/projects/"+response[0]['project_photo'];

            this.router.navigate(["/new-project", {project_id:project_id, project_edit:true}]);
            loading.dismiss();
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        this.getProjectLocal(project_id).then((data: any) => {
          this.project.name_project = data[0]['name_project'];
          this.project.project_country = data[0]['project_country'];
          this.project.project_department = data[0]['project_department']
          this.project.project_city = data[0]['project_city'];
          this.project.project_municipality = data[0]['project_municipality'];
          this.project.project_address = data[0]['project_address'];
          this.project.project_location = data[0]['project_location'];
          this.project.project_contact = data[0]['project_contact'];
          this.project.project_phone = data[0]['project_phone'];
          this.project.project_email = data[0]['project_email'];
          this.project.project_photo = data[0]['project_photo'];
          this.router.navigate(["/new-project", {project_id:project_id, project_edit:true}]);
          loading.dismiss();
        }, (error) => {
          console.log(error);
        })
      }

    });
  }

  async saveEditProject(project) {
    const loading = await this.loadingController.create({
      message: 'Guardando cambios'
    });
    
    await loading.present();

    let customer_id = localStorage.getItem("customer_id");
    
    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.save(project, customer_id).subscribe(
          (response)=>{
            loading.dismiss();
            this.getProjects();
            this.router.navigate(["/projects"]);
            this.general.notify("Proyecto guardado", "success");
          },
          (error)=>{
            console.log(error);
            loading.dismiss();
            this.general.notify("Error al editar el proyecto", "danger");
          });
      } else {
        this.updateLocal(project).then((data: any) => {
          this.getProjects(); 
          loading.dismiss();
          this.general.notify("Proyecto guardado", "success");
          this.router.navigate(["/projects"]);
        }, (error) => {
          if(error['rowsAffected'] > 0) {
            this.getProjects();  
            this.general.notify("Proyecto guardado", "success");
          } else {
            this.general.notify("Error al editar el proyecto", "danger");
          }
          this.router.navigate(["/projects"]);
          loading.dismiss();
        })
    }
  });
  }

  async deleteProject(project_id) {
    this.popoverCtrl.dismiss();
    const loading = await this.loadingController.create({
      message: 'Eliminando'
    });
    
    await loading.present();
    
    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.delete(project_id).subscribe(
          (response)=>{
            this.getProjects();
            loading.dismiss();
          },
          (error)=>{
            console.log(error);
          });
      } else {
        this.deleteLocal(project_id).then((data: any) => {
          this.getProjects(); 
          loading.dismiss();
        }, (error) => {
          if(error['rowsAffected'] > 0) {
            this.general.notify("Proyecto eliminado", "success");
          } else {
            this.general.notify("Error al eliminar el proyecto", "danger");
          }
          this.getProjects();  
          loading.dismiss();
        })
    }
  });
  }

  async getProjectFilter(search){
    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.getFilter(search).subscribe(
          (response)=>{
            this.projects = response;
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        this.getLocalFilter(search).then((data: any) => {
          this.projects = data;
        }, (error) => {
          console.log(error);
        })
      }

    });
  }

  //Remote Services
  save(project:Projects, customer_id) : Observable<boolean> {
    return this.http.post<boolean>("https://florayfauna.app/server/public/api/projects/save/"+customer_id, project)
  }
  
  get(customer_id) : Observable<Projects[]> {
    return this.http.get<Projects[]>('https://florayfauna.app/server/public/api/projects/get/'+customer_id)
  }

  getFilter(search) : Observable<Projects[]> {
    search = search == "" ? 0 : search;
    return this.http.get<Projects[]>('https://florayfauna.app/server/public/api/projects/filter/'+search)
  }

  getProject(id) : Observable<Projects[]> {
    return this.http.get<Projects[]>('https://florayfauna.app/server/public/api/projects/get/'+id)
  }

  delete(id) : Observable<boolean>  {
    return this.http.delete<boolean>("https://florayfauna.app/server/public/api/projects/delete/"+id)
  }

  //Local Services
  saveLocal(project){
    return new Promise ((resolve, reject) => {
      let sql = 'INSERT INTO projects \n\
      (name_project, \n\
      project_address, \n\
      project_country, \n\
      project_department, \n\
      project_city, \n\
      project_municipality, \n\
      project_location, \n\
      project_phone, \n\
      project_contact, \n\
      project_email, \n\
      project_photo, \n\
      project_status) VALUES \n\
      ("'+project.name_project+'",\n\
      "'+project.project_address+'",\n\
      "'+project.project_country+'",\n\
      "'+project.project_department+'",\n\
      "'+project.project_city+'",\n\
      "'+project.project_municipality+'",\n\
      "'+project.project_location+'",\n\
      "'+project.project_phone+'",\n\
      "'+project.project_contact+'",\n\
      "'+project.project_email+'",\n\
      "'+project.project_photo+'",\n\
      "1")';

      this.general.db.executeSql(sql).then((data) =>{
        this.getLocal();
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  updateLocal(project){
    return new Promise ((resolve, reject) => {
      let sql = 'UPDATE projects SET \n\
      name_project = "'+project.name_project+'", \n\
      project_address = "'+project.project_address+'", \n\
      project_country = "'+project.project_country+'", \n\
      project_department = "'+project.project_department+'", \n\
      project_city = "'+project.project_city+'", \n\
      project_municipality = "'+project.project_municipality+'", \n\
      project_location = "'+project.project_location+'", \n\
      project_phone = "'+project.project_phone+'", \n\
      project_contact = "'+project.project_contact+'", \n\
      project_email = "'+project.project_email+'", \n\
      project_photo = "'+project.project_photo+'" \n\
      WHERE rowid = "'+project.id+'"';

      this.general.db.executeSql(sql).then((data) =>{
        this.getLocal();
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getLocal(){
    return new Promise ((resolve, reject) => {
      this.general.db.executeSql("SELECT rowid, * FROM projects ORDER BY rowid DESC", []).then((data) => {
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

  getLocalFilter(search){
    return new Promise ((resolve, reject) => {
      this.general.db.executeSql("SELECT rowid, * FROM projects WHERE name_project LIKE '%"+search+"%' ORDER BY rowid DESC", []).then((data) => {
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

  getProjectLocal(project_id){
    return new Promise ((resolve, reject) => {
      this.general.db.executeSql("SELECT rowid, * FROM projects WHERE rowid = '"+project_id+"'", []).then((data) => {
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

  deleteLocal(id){
    return new Promise ((resolve, reject) => {
      let sql = 'DELETE FROM projects WHERE rowid = "'+id+'"';
      this.general.db.executeSql(sql).then((data) =>{
        this.getProjects();
      }, (error) => {
        reject(error);
      });
    });
  }

}

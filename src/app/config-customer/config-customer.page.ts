import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.models';
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-config-customer',
  templateUrl: './config-customer.page.html',
  styleUrls: ['./config-customer.page.scss'],
})
export class ConfigCustomerPage implements OnInit {

  public customer:Customer = new Customer();

  constructor(
    private http:HttpClient,
    public loadingController:LoadingController,
    public toastController: ToastController,
    private platform: Platform,
    private general:GeneralService
  ) { }

  ngOnInit() {
    this.getCustomerData();
  }

  async getCustomerData() {
    const loading = await this.loadingController.create({
      message: 'Cargando datos'
    });

    loading.present();

    let customer_id = localStorage.getItem("customer_id");

    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.get(customer_id).subscribe(
          (response)=>{
            this.customer.customer_name = response[0]['customer_name'];
            this.customer.customer_nit = response[0]['customer_nit'];
            this.customer.customer_country = response[0]['customer_country'];
            this.customer.customer_address = response[0]['customer_address'];
            this.customer.customer_city = response[0]['customer_city'];
            this.customer.customer_phone = response[0]['customer_phone'];
            this.customer.customer_cel = response[0]['customer_cel'];
            this.customer.customer_contact = response[0]['customer_contact'];
            this.customer.customer_email = response[0]['customer_email'];

            loading.dismiss();
          },
          (error)=>{
            console.log(error);
          });
        
      } else {
        
      }
    });
  }

  async updateCustomer() {
    const loading = await this.loadingController.create({
      message: 'Guardando cambios'
    });
    
    await loading.present();

    let customer_id = localStorage.getItem("customer_id");
    
    this.platform.ready().then(() => {
      //if (this.platform.is('desktop')) {
      if (true) {
        this.save(this.customer, customer_id).subscribe(
          (response)=>{
            loading.dismiss();
            this.general.notify("La información fue actualizada correctamente.", "success");
          },
          (error)=>{
            console.log(error);
            loading.dismiss();
            this.general.notify("Error al actualizar la información", "danger");
          });
      } else {

      }
    });
  }

  get(customer_id) : Observable<Customer[]> {
    return this.http.get<Customer[]>('https://florayfauna.app/server/public/api/customer/get/'+customer_id)
  }

  save(customer:Customer, customer_id) : Observable<boolean> {
    return this.http.post<boolean>("https://florayfauna.app/server/public/api/customer/save/"+customer_id, customer)
  }

}

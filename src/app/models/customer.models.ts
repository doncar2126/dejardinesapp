export interface Customer {
    id:any;
    customer_name:string;
    customer_nit:string;
    customer_address:string;
    customer_country:string;
    customer_city:string;
    customer_phone:string;
    customer_contact:string;
    customer_cel:string;
    customer_email:string;
    customer_code:string;
    customer_status:any;
    timestamp:Date;
}

export class Customer {
    id:any;
    customer_name:string;
    customer_nit:string;
    customer_address:string;
    customer_country:string;
    customer_city:string;
    customer_phone:string;
    customer_contact:string;
    customer_cel:string;
    customer_email:string;
    customer_code:string;
    customer_status:any;
    constructor(data?: Customer) {
        if(data != null) {
            this.id = data.id;
            this.customer_name = data.customer_name;
            this.customer_nit = data.customer_nit;
            this.customer_address = data.customer_address;
            this.customer_country = data.customer_country;
            this.customer_city = data.customer_city;
            this.customer_phone = data.customer_city;
            this.customer_contact = data.customer_city;
            this.customer_cel = data.customer_city;
            this.customer_email = data.customer_city;
            this.customer_code = data.customer_code;
            this.customer_status = data.customer_status;
            this.timestamp = data.timestamp;
            return
        }
        
        this.id = this.id;
        this.customer_name = this.customer_name;
        this.customer_nit = this.customer_nit;
        this.customer_address = this.customer_address;
        this.customer_country = this.customer_country;
        this.customer_city = this.customer_city;
        this.customer_phone = this.customer_city;
        this.customer_contact = this.customer_city;
        this.customer_cel = this.customer_city;
        this.customer_email = this.customer_city;
        this.customer_code = this.customer_code;
        this.customer_status = this.customer_status;
        this.timestamp = this.timestamp;
    }
}
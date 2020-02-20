export interface Projects {
    id:any;
    name_project:string;
    project_address:string;
    project_cel:string;
    project_city:string;
    project_municipality:string;
    project_contact:string;
    project_country:string;
    project_department:string;
    project_email:string;
    project_location:string;
    project_phone:string;
    project_photo:any;
    project_status:number;
    project_timestamp:Date;
}

export class Projects {
    id:any;
    name_project:string;
    project_address:string;
    project_cel:string;
    project_city:string;
    project_municipality:string;
    project_contact:string;
    project_country:string;
    project_department:string;
    project_email:string;
    project_location:string;
    project_phone:string;
    project_photo:any;
    project_status:number;
    project_timestamp:Date;

    constructor(data?: Projects) {
        if(data != null) {
            this.id = data.id;
            this.name_project = data.name_project;
            this.project_address = data.project_address;
            this.project_cel = data.project_cel;
            this.project_city = data.project_city;
            this.project_municipality = data.project_municipality;
            this.project_contact = data.project_contact;
            this.project_country = data.project_country;
            this.project_department = data.project_department;
            this.project_email = data.project_email;
            this.project_location = data.project_location;
            this.project_phone = data.project_phone;
            this.project_photo = data.project_photo;
            this.project_status = data.project_status;
            this.project_timestamp = data.project_timestamp;
            return
        }
        this.id = this.id;
        this.name_project = this.name_project;
        this.project_address = this.project_address;
        this.project_cel = this.project_cel;
        this.project_city = this.project_city;
        this.project_municipality = this.project_municipality;
        this.project_contact = this.project_contact;
        this.project_country = this.project_country;
        this.project_department = this.project_department;
        this.project_email = this.project_email;
        this.project_location = this.project_location;
        this.project_phone = this.project_phone;
        this.project_photo = this.project_photo;
        this.project_status = this.project_status;
        this.project_timestamp = this.project_timestamp;
    }
}
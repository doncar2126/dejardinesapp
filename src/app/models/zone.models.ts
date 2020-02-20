export interface Zone {
    id:any;
    project_id:any;
    zone_code:string;
    zone_name:string;
    zone_area_m2:string;
    altitude_zone:string;
    coordinate_zone_x:string;
    coordinate_zone_y:string;
    latitude_zone:string;
    zone_length:any;
    id_life_zone:number;
    responsable_name_zone:string;
    responsable_cel_zone:string;
    responsable_mail_zone:string;
    observations_zone:string;
    photo_zone:any;
    zone_status:number;
    zone_timestamp:Date;
}

export class Zone {
    id:any;
    project_id:any;
    zone_code:string;
    zone_name:string;
    zone_area_m2:string;
    altitude_zone:string;
    coordinate_zone_x:string;
    coordinate_zone_y:string;
    latitude_zone:string;
    zone_length:any;
    id_life_zone:number;
    responsable_name_zone:string;
    responsable_cel_zone:string;
    responsable_mail_zone:string;
    observations_zone:string;
    photo_zone:any;
    zone_status:number;
    zone_timestamp:Date;

    constructor(data?: Zone) {
        if(data != null) {
            this.id = data.id;
            this.project_id = data.project_id;
            this.zone_code = data.zone_code;
            this.zone_name = data.zone_name;
            this.zone_area_m2 = data.zone_area_m2;
            this.altitude_zone = data.altitude_zone;
            this.coordinate_zone_x = data.coordinate_zone_x;
            this.coordinate_zone_y = data.coordinate_zone_y;
            this.latitude_zone = data.latitude_zone;
            this.zone_length = data.zone_length;
            this.id_life_zone = data.id_life_zone;
            this.responsable_name_zone = data.responsable_name_zone;
            this.responsable_cel_zone = data.responsable_cel_zone;
            this.responsable_mail_zone = data.responsable_mail_zone;
            this.observations_zone = data.observations_zone;
            this.photo_zone = data.photo_zone;
            this.zone_status = data.zone_status;
            this.zone_timestamp = data.zone_timestamp;
            return
        }
        this.id = this.id;
        this.project_id = this.project_id;
        this.zone_code = this.zone_code;
        this.zone_name = this.zone_name;
        this.zone_area_m2 = this.zone_area_m2;
        this.altitude_zone = this.altitude_zone;
        this.coordinate_zone_x = this.coordinate_zone_x;
        this.coordinate_zone_y = this.coordinate_zone_y;
        this.latitude_zone = this.latitude_zone;
        this.zone_length = this.zone_length;
        this.id_life_zone = this.id_life_zone;
        this.responsable_name_zone = this.responsable_name_zone;
        this.responsable_cel_zone = this.responsable_cel_zone;
        this.responsable_mail_zone = this.responsable_mail_zone;
        this.observations_zone = this.observations_zone;
        this.photo_zone = this.photo_zone;
        this.zone_status = this.zone_status;
        this.zone_timestamp = this.zone_timestamp;
    }
}
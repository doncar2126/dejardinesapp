export interface Plot {
    id:any;
    project_id:any;
    plot_code:string;
    name_plot:string;
    id_plot_form:string;
    long_plot:string;
    wide_plot:string;
    plot_diameter:string;
    radio_plot:string;
    altitude_plot:string;
    coordinate_plot_x:string;
    coordinate_plot_y:string;
    latitude_plot:string;
    plot_length:any;
    id_life_zone:number;
    responsable_name_plot:string;
    responsable_cel_plot:string;
    responsable_mail_plot:string;
    observations_plot:string;
    photo_plot:any;
    plot_status:number;
    plot_timestamp:Date;
}

export class Plot {
    id:any;
    project_id:any;
    plot_code:string;
    name_plot:string;
    id_plot_form:string;
    long_plot:string;
    wide_plot:string;
    plot_diameter:string;
    radio_plot:string;
    altitude_plot:string;
    coordinate_plot_x:string;
    coordinate_plot_y:string;
    latitude_plot:string;
    plot_length:any;
    id_life_zone:number;
    responsable_name_plot:string;
    responsable_cel_plot:string;
    responsable_mail_plot:string;
    observations_plot:string;
    photo_plot:any;
    plot_status:number;
    plot_timestamp:Date;

    constructor(data?: Plot) {
        if(data != null) {
            this.id = data.id;
            this.project_id = data.project_id;
            this.plot_code = data.plot_code;
            this.name_plot = data.name_plot;
            this.id_plot_form = data.id_plot_form;
            this.long_plot = data.long_plot;
            this.wide_plot = data.wide_plot;
            this.plot_diameter = data.plot_diameter;
            this.radio_plot = data.radio_plot;
            this.altitude_plot = data.altitude_plot;
            this.coordinate_plot_x = data.coordinate_plot_x;
            this.coordinate_plot_y = data.coordinate_plot_y;
            this.latitude_plot = data.latitude_plot;
            this.plot_length = data.plot_length;
            this.id_life_zone = data.id_life_zone;
            this.responsable_name_plot = data.responsable_name_plot;
            this.responsable_cel_plot = data.responsable_cel_plot;
            this.responsable_mail_plot = data.responsable_mail_plot;
            this.observations_plot = data.observations_plot;
            this.photo_plot = data.photo_plot;
            this.plot_status = data.plot_status;
            this.plot_timestamp = data.plot_timestamp;
            return
        }
        this.id = this.id;
        this.project_id = this.project_id;
        this.plot_code = this.plot_code;
        this.name_plot = this.name_plot;
        this.id_plot_form = this.id_plot_form;
        this.long_plot = this.long_plot;
        this.wide_plot = this.wide_plot;
        this.plot_diameter = this.plot_diameter;
        this.radio_plot = this.radio_plot;
        this.altitude_plot = this.altitude_plot;
        this.coordinate_plot_x = this.coordinate_plot_x;
        this.coordinate_plot_y = this.coordinate_plot_y;
        this.latitude_plot = this.latitude_plot;
        this.plot_length = this.plot_length;
        this.id_life_zone = this.id_life_zone;
        this.responsable_name_plot = this.responsable_name_plot;
        this.responsable_cel_plot = this.responsable_cel_plot;
        this.responsable_mail_plot = this.responsable_mail_plot;
        this.observations_plot = this.observations_plot;
        this.photo_plot = this.photo_plot;
        this.plot_status = this.plot_status;
        this.plot_timestamp = this.plot_timestamp;
    }
}
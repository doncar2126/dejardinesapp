export interface CommonNames {
    id:any;
    id_species:any;
    common_name:string;
    common_country:string;
    common_region:string;
    commom_name_status:any;
    timestamp:Date;
}

export class CommonNames {
    id:any;
    id_species:any;
    common_name:string;
    common_country:string;
    common_region:string;
    commom_name_status:any;
    timestamp:Date;

    constructor(data?: CommonNames) {
        if(data != null) {
            this.id = data.id;
            this.id_species = data.id_species;
            this.common_name = data.common_name;
            this.common_country = data.common_country;
            this.common_region = data.common_region;
            this.commom_name_status = data.commom_name_status;
            this.timestamp = data.timestamp;
            return
        }
        this.id = this.id;
        this.id_species = this.id_species;
        this.common_name = this.common_name;
        this.common_country = this.common_country;
        this.common_region = this.common_region;
        this.commom_name_status = this.commom_name_status;
        this.timestamp = this.timestamp;
    }
}
export interface IndividualsFlora {
    id:any;
    id_plot_zone:any;
    parent_type:string;
    id_species:any;
    id_common_name:any;
    code_individual:string;
    family_individual:string;
    common_name:string;
    family_name:string;
    diameter_dap:string;
    circumference_cap:string;
    commercial_height:string;
    total_height:string;
    cup_height:string;
    cup_diameter_y:string;
    cup_diameter_x:string;
    color_flower:string;
    fruit_color:string;
    observations:string;
    id_related_zone:any;
    id_related_individual:any;
    photo_silhouette:any;
    photo_polite:any;
    photo_leaves:any;
    photo_flowers:any;
    photo_fruits:any;
    photo_seeds:any;
    individuals_status:any;
    individuals_create:Date;
    individuals_timestamp:Date;
}

export class IndividualsFlora {
    id:any;
    id_plot_zone:any;
    parent_type:string;
    id_species:any;
    id_common_name:any;
    code_individual:string;
    family_individual:string;
    common_name:string;
    family_name:string;
    diameter_dap:string;
    circumference_cap:string;
    commercial_height:string;
    total_height:string;
    cup_height:string;
    cup_diameter_y:string;
    cup_diameter_x:string;
    color_flower:string;
    fruit_color:string;
    observations:string;
    id_related_zone:any;
    id_related_individual:any;
    photo_silhouette:any;
    photo_polite:any;
    photo_leaves:any;
    photo_flowers:any;
    photo_fruits:any;
    photo_seeds:any;
    individuals_status:any;
    individuals_create:Date;
    individuals_timestamp:Date;

    constructor(data?: IndividualsFlora) {
        if(data != null) {
            this.id = data.id;
            this.id_plot_zone = data.id_plot_zone;
            this.parent_type = data.parent_type;
            this.id_species = data.id_species;
            this.id_common_name = data.id_common_name;
            this.code_individual = data.code_individual;
            this.family_individual = data.code_individual;
            this.common_name = data.common_name;
            this.family_name = data.family_name;
            this.diameter_dap = data.diameter_dap;
            this.circumference_cap = data.circumference_cap;
            this.commercial_height = data.commercial_height;
            this.total_height = data.total_height;
            this.cup_height = data.cup_height;
            this.cup_diameter_y = data.cup_diameter_y;
            this.cup_diameter_x = data.cup_diameter_x;
            this.color_flower = data.color_flower;
            this.fruit_color = data.fruit_color;
            this.observations = data.observations;
            this.id_related_zone = data.id_related_zone;
            this.id_related_individual = data.id_related_individual;
            this.photo_silhouette = data.photo_silhouette;
            this.photo_polite = data.photo_polite;
            this.photo_leaves = data.photo_leaves;
            this.photo_flowers = data.photo_flowers;
            this.photo_fruits = data.photo_fruits;
            this.photo_seeds = data.photo_seeds;
            this.individuals_status = data.individuals_status;
            this.individuals_create = data.individuals_create;
            this.individuals_timestamp = data.individuals_timestamp;
            return
        }
            this.id = this.id;
            this.id_plot_zone = this.id_plot_zone;
            this.parent_type = this.parent_type;
            this.id_species = this.id_species;
            this.id_common_name = this.id_common_name;
            this.code_individual = this.code_individual;
            this.family_individual = this.code_individual;
            this.common_name = this.common_name;
            this.family_name = this.family_name;
            this.diameter_dap = this.diameter_dap;
            this.circumference_cap = this.circumference_cap;
            this.commercial_height = this.commercial_height;
            this.total_height = this.total_height;
            this.cup_height = this.cup_height;
            this.cup_diameter_y = this.cup_diameter_y;
            this.cup_diameter_x = this.cup_diameter_x;
            this.color_flower = this.color_flower;
            this.fruit_color = this.fruit_color;
            this.observations = this.observations;
            this.id_related_zone = this.id_related_zone;
            this.id_related_individual = this.id_related_individual;
            this.photo_silhouette = this.photo_silhouette;
            this.photo_polite = this.photo_polite;
            this.photo_leaves = this.photo_leaves;
            this.photo_flowers = this.photo_flowers;
            this.photo_fruits = this.photo_fruits;
            this.photo_seeds = this.photo_seeds;
            this.individuals_status = this.individuals_status;
            this.individuals_create = this.individuals_create;
            this.individuals_timestamp = this.individuals_timestamp;
    }
}
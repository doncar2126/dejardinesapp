export interface User {
    id:any;
    code:string;
    user_name:string;
    username:string;
    user_pass:string;
    user_cel:string;
    user_mail:string;
    profile_photo:any;
    user_status:any;
    timestamp:Date;
}

export class User {
    id:any;
    code:string;
    user_name:string;
    username:string;
    user_pass:string;
    user_cel:string;
    user_mail:string;
    profile_photo:any;
    user_status:any;
    timestamp:Date;
    constructor(data?: User) {
        if(data != null) {
            this.id = data.id;
            this.code = data.code;
            this.user_name = data.user_name;
            this.username = data.username;
            this.user_pass = data.user_pass;
            this.user_mail = data.user_mail;
            this.profile_photo = data.profile_photo;
            this.user_status = data.user_status;
            this.timestamp = data.timestamp;
            return
        }
        
        this.id = this.id;
        this.code = this.code;
        this.user_name = this.user_name;
        this.username = this.username;
        this.user_pass = this.user_pass;
        this.user_mail = this.user_mail;
        this.profile_photo = this.profile_photo;
        this.user_status = this.user_status;
        this.timestamp = this.timestamp;
    }
}
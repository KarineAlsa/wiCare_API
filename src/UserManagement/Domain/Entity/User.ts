import { Contact } from './Contact';
export class User {

    public email:string;
    public password:string;
    public role: string
    public contact:Contact;
    public id?:number

    constructor(
        
        email:string,
        password:string,
        role: string,
        contact:Contact,
        id?:number
    ) {
        
        this.email = email;
        this.password = password;
        this.contact = contact;
        this.role = role
        this.id = id;
    }


}
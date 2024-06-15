import { Contact } from "./Contact";

export class Manager {

    public position:string;
    public contact:Contact;
    public institution_id?:string;
    public id?:number

    constructor(
        
        position:string,
        contact_id:Contact,
        institution_id:string,
        id?:number
    ) {
        this.position = position;
        this.contact = contact_id;
        this.institution_id = institution_id;
        this.id = id;
    }


}
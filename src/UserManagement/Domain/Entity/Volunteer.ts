import {Contact}  from "./Contact";
export class Volunteer {

    public CURP:string;
    public occupation:string;
    public postal:string;
    public contact?:Contact;
    public id?:number

    constructor(
        CURP:string,
        occupation:string,
        contact:Contact,
        postal:string,
        id?:number
    ) {
        this.CURP = CURP;
        this.occupation = occupation;
        this.contact = contact;
        this.postal = postal;
        this.id = id;
    }

}
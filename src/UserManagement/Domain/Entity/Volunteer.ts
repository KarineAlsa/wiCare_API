import {Contact}  from "./Contact";
export class Volunteer {

    public CURP:string;
    public occupation:string;
    public contact?:Contact;
    public id?:number

    constructor(
        CURP:string,
        occupation:string,
        contact:Contact,
        id?:number
    ) {
        this.CURP = CURP;
        this.occupation = occupation;
        this.contact = contact;
        this.id = id;
    }

}
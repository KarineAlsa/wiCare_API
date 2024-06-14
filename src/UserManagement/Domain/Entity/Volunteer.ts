export class Volunteer {

    public CURP:string;
    public occupation:string;
    public contact_id:string;
    public id?:number

    constructor(
        CURP:string,
        occupation:string,
        contact_id:string,
        id?:number
    ) {
        this.CURP = CURP;
        this.occupation = occupation;
        this.contact_id = contact_id;
        this.id = id;
    }

}
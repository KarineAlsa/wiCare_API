export class User {

    public position:string;
    public contact_id:string;
    public institution_id:string;
    public id?:number

    constructor(
        
        position:string,
        contact_id:string,
        institution_id:string,
        id?:number
    ) {
        this.position = position;
        this.contact_id = contact_id;
        this.institution_id = institution_id;
        this.id = id;
    }


}
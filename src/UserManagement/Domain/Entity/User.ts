export class User {

    public email:string;
    public password:string;
    public role: string
    public id?:number

    constructor(
        
        email:string,
        password:string,
        role: string,
        id?:number
    ) {
        
        this.email = email;
        this.password = password;
        this.role = role
        this.id = id;
    }


}
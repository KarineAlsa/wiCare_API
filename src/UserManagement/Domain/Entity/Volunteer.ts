export class Volunteer {

    public name:string;
    public age:number;
    public cellphone:string;
    public curp:string;
    public occupation:string;
    public address:string;
    public gender:string;
    public email:string;
    public password:string;
    public createdAt:string;
    public id?:number

    constructor(
        name:string,
        age:number,
        cellphone:string,
        curp:string,
        occupation:string,
        address:string,
        gender:string,
        email:string,
        password:string,
        createdAt:string,
        id?:number
    ) {
        this.name = name;
        this.age = age;
        this.cellphone = cellphone;
        this.curp = curp;
        this.occupation = occupation;
        this.address = address;
        this.gender = gender;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.id = id;
    }


}
export class Association {

    public name:string;
    public age:number;
    public cellphone:string;
    public address:string;
    public genre:string;
    public user_id:string;
    public id?:number

    constructor(
        name:string,
        age:number,
        cellphone:string,
        address:string,
        genre:string,
        user_id:string,
        id?:number
    ) {
        this.name = name;
        this.age = age;
        this.cellphone = cellphone;
        this.address = address;
        this.genre = genre;
        this.user_id = user_id;
        this.id = id;
    }


}
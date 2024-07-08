
export class Contact {

    public name:string;
    public age:number;
    public cellphone:string;
    public latitude:number;
    public longitude:number;
    public genre:string;
    public user_id?:string;
    public id?:number

    constructor(
        name:string,
        age:number,
        cellphone:string,
        latitude:number,
        longitude:number,
        genre:string,
        user_id:string,
        id?:number
    ) {
        this.name = name;
        this.age = age;
        this.cellphone = cellphone;
        this.latitude = latitude;
        this.longitude = longitude;
        this.genre = genre;
        this.user_id = user_id;
        this.id = id;
    }


}
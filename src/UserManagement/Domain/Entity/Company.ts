import { Manager } from "./Manager";
export class Company {

    public name:string;
    public foundation_date:string;
    public context:string
    public description:string;
    public manager: Manager;
    public RFC:string;
    public latitude:number;
    public longitude:number;
    public cellphone;
    public id?:number

    constructor(
        
        name:string,
        foundation_date:string,
        context:string,
        description:string,
        manager:Manager,
        RFC:string,
        latitude:number,
        longitude:number,
        cellphone:string,
        id?:number
    ) {
        this.name = name;
        this.foundation_date = foundation_date;
        this.context = context;
        this.description = description;
        this.manager = manager
        this.RFC = RFC;
        this.latitude = latitude;
        this.longitude = longitude;
        this.cellphone = cellphone;
        this.id = id;
    }


}
import { Manager } from "./Manager";

export class Association {
    public name:string;
    public foundation_date:string;
    public social_reason:string;
    public description:string;
    public manager:Manager;
    public RFC:string;
    public address:string;
    public cellphone:string;
    public id?:number

    constructor(
        name:string,
        foundation_date:string,
        social_reason:string,
        description:string,
        manager:Manager,
        RFC:string,
        address:string,
        cellphone:string,
        id?:number
    ) {
        this.name = name;
        this.foundation_date = foundation_date;
        this.social_reason = social_reason
        this.description = description;
        this.manager = manager;
        this.RFC = RFC;
        this.address = address;
        this.cellphone = cellphone;
        this.id = id;
    }


}
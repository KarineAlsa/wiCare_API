export class Company {

    public foundation_date:string;
    public context:string
    public description:string;
    public RFC:string;
    public id?:number

    constructor(
        
        foundation_date:string,
        context:string,
        description:string,
        RFC:string,
        id?:number
    ) {
        this.foundation_date = foundation_date;
        this.context = context
        this.description = description;
        this.RFC = RFC;
        this.id = id;
    }


}
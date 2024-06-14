export class Association {

    public foundation_date:string;
    public social_reason:string;
    public description:string;
    public RFC:string;
    public id?:number

    constructor(
        foundation_date:string,
        social_reason:string,
        description:string,
        RFC:string,
        id?:number
    ) {
        this.foundation_date = foundation_date;
        this.social_reason = social_reason
        this.description = description;
        this.RFC = RFC;
        this.id = id;
    }


}
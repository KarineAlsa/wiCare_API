export class Association {

    public name:string;
    public address:string;
    public createdAt:string;
    public representative:string;
    public socialtype:string;
    public description:string;
    public cellphone:string;
    public rfc:string;
    public nameRepresentative:string;
    public positionRepresentative:string;
    public cellphoneRepresentative:string;
    public addressRepresentative:string;
    public emailRepresentative:string;
    public passwordRepresentative:string;
    public id?:number

    constructor(
        name:string,
        address:string,
        createdAt:string,
        representative:string,
        socialtype:string,
        description:string,
        cellphone:string,
        rfc:string,
        nameRepresentative:string,
        positionRepresentative:string,
        cellphoneRepresentative:string,
        addressRepresentative:string,
        emailRepresentative:string,
        passwordRepresentative:string,
        id?:number
    ) {
        this.name = name;
        this.createdAt = createdAt;
        this.address = address;
        this.representative = representative;
        this.socialtype = socialtype;
        this.description = description;
        this.cellphone = cellphone;
        this.rfc = rfc;
        this.nameRepresentative = nameRepresentative;
        this.positionRepresentative = positionRepresentative;
        this.cellphoneRepresentative = cellphoneRepresentative;
        this.addressRepresentative = addressRepresentative;
        this.emailRepresentative = emailRepresentative;
        this.passwordRepresentative = passwordRepresentative;
        this.id = id;
    }


}
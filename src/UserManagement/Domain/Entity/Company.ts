export class Company {

    public name:string;
    public address:string;
    public createdAt:string;
    public representative:string;
    public type:string;
    public description:string;
    public cellphone:string;
    public rfc:string;
    public email:string;
    public password:string;
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
        type:string,
        description:string,
        cellphone:string,
        rfc:string,
        email:string,
        password:string,
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
        this.type = type;
        this.description = description;
        this.cellphone = cellphone;
        this.rfc = rfc;
        this.email = email;
        this.password = password;
        this.nameRepresentative = nameRepresentative;
        this.positionRepresentative = positionRepresentative;
        this.cellphoneRepresentative = cellphoneRepresentative;
        this.addressRepresentative = addressRepresentative;
        this.emailRepresentative = emailRepresentative;
        this.passwordRepresentative = passwordRepresentative;
        this.id = id;
    }


}
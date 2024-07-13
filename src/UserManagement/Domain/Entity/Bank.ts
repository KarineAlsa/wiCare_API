export class Bank {
    public number:string;
    public bank:string;
    public name:string;
    public association_id:number;
    public id?:number

    constructor(
        number:string,
        bank:string,
        name:string,
        association_id:number,
        id?:number
    ) {
        this.name = name;
        this.number = number;
        this.bank = bank;
        this.association_id = association_id;
        this.id = id;
    }
}
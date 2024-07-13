import { User } from "../../Domain/Entity/User";
import { Manager } from "../../Domain/Entity/Manager";
import { Company } from "../../Domain/Entity/Company";
import  CompanyInterface  from "../../Domain/Port/AssociationInterface";
import { Contact } from "../../Domain/Entity/Contact";
import { double } from "aws-sdk/clients/lightsail";
import { Bank } from "../../Domain/Entity/Bank";


export default class AddBankUseCase {

    constructor(readonly repository:CompanyInterface) {}

    async run( {name, number, bank, association_id}: {
        name:string,
        number:string,
        bank:string,
        association_id:number
      } ):Promise<User|any> {
        try {

            let bankAccount = new Bank(
                number,
                bank,
                name,
                association_id
                
            );
            return await this.repository.addBankAccount(bankAccount);
            
        }catch(error) {

        }
    }

}
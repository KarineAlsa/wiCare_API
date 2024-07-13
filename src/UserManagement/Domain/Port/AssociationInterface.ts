import { Association } from "../Entity/Association";
import { Bank } from "../Entity/Bank";
import {User} from "../Entity/User";


export default interface AssociationInterface{
    registerAssociation(user:User, association:Association):Promise<User|any>;
    getProfileDataAssociation(id:number):Promise<Association|any>;
    addBankAccount(bank:Bank):Promise<any>;
}
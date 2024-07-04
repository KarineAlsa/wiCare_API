import { Association } from "../Entity/Association";
import {User} from "../Entity/User";


export default interface AssociationInterface{
    registerAssociation(user:User, association:Association):Promise<User|any>;
    getProfileDataAssociation(id:number):Promise<Association|any>;
}
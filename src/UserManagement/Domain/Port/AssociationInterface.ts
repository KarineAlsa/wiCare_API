import { Association } from "../Entity/Association";
import {User} from "../Entity/User";


export default interface VolunteerInterface{
    registerAssociation(user:User, association:Association):Promise<User|any>;
    getProfileDataAssociation(id:number):Promise<Association|any>;
}
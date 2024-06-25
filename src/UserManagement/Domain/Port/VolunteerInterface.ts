import {User} from "../Entity/User";
import { Volunteer } from "../Entity/Volunteer";

export default interface VolunteerInterface{
    registerVolunteer(user:User, volunteer:Volunteer):Promise<User|any>;
    getProfileDataVolunteer(id:number):Promise<Volunteer|any>;
}
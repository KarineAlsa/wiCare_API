import { Company } from "../Entity/Company";
import {User} from "../Entity/User";


export default interface CompanyInterface{
    registerCompany(user:User, company:Company):Promise<User|any>;
    getProfileDataCompany(id:number):Promise<Company|any>;
}
import {User} from "../Entity/User";


export default interface UserInterface{
    login(email:string,password:string):Promise<User|any>;
}
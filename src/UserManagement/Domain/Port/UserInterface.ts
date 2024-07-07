import {User} from "../Entity/User";


export default interface UserInterface{
    login(email:string,password:string):Promise<User|any>;
    uploadPhoto(fileUrl:string, id:any):Promise<User|any>;
}
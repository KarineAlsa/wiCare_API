import { User } from "../../Domain/Entity/User";
import { Manager } from "../../Domain/Entity/Manager";
import { Association } from "../../Domain/Entity/Association";
import  AssociationInterface  from "../../Domain/Port/AssociationInterface";
import { Contact } from "../../Domain/Entity/Contact";
import { double } from "aws-sdk/clients/lightsail";

export default class RegisterAssociationUseCase {

    constructor(readonly repository:AssociationInterface) {}

    async run( {name, email, password, role, manager, foundation_date, social_reason, description, RFC, latitude, longitude, cellphone}: {
        name:string,
        email:string,
        password:string,
        role:string,
        manager:Manager,
        foundation_date:string,
        social_reason:string,
        description:string,
        RFC:string,
        latitude:double,
        longitude:double,
        cellphone:string
      } ):Promise<User|any> {
        try {

            let user = new User(
                email,
                password,
                role,
                manager.contact
                
            );
            let association = new Association(name,foundation_date,social_reason,description,manager, RFC, latitude,longitude, cellphone);

            return await this.repository.registerAssociation(user,association);
        }catch(error) {

        }
    }

}
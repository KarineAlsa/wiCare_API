import { User } from "../../Domain/Entity/User";
import { Manager } from "../../Domain/Entity/Manager";
import { Company } from "../../Domain/Entity/Company";
import  CompanyInterface  from "../../Domain/Port/CompanyInterface";
import { Contact } from "../../Domain/Entity/Contact";
import { double } from "aws-sdk/clients/lightsail";
import { Double } from "aws-sdk/clients/cloudtrail";

export default class RegisterCompanyUseCase {

    constructor(readonly repository:CompanyInterface) {}

    async run( {name, email, password, role, manager, foundation_date, context, description, RFC, latitude,longitude, cellphone}: {
        name:string,
        email:string,
        password:string,
        role:string,
        manager:Manager,
        foundation_date:string,
        context:string,
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
            let company = new Company(name,foundation_date,context,description,manager, RFC, latitude,longitude, cellphone);

            return await this.repository.registerCompany(user,company);
        }catch(error) {

        }
    }

}
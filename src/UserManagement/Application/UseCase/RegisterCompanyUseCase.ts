import { User } from "../../Domain/Entity/User";
import { Manager } from "../../Domain/Entity/Manager";
import { Company } from "../../Domain/Entity/Company";
import  CompanyInterface  from "../../Domain/Port/CompanyInterface";
import { Contact } from "../../Domain/Entity/Contact";

export default class RegisterCompanyUseCase {

    constructor(readonly repository:CompanyInterface) {}

    async run( {name, email, password, role, manager, foundation_date, context, description, RFC, address, cellphone}: {
        name:string,
        email:string,
        password:string,
        role:string,
        manager:Manager,
        foundation_date:string,
        context:string,
        description:string,
        RFC:string,
        address:string,
        cellphone:string
      } ):Promise<User|any> {
        try {

            let user = new User(
                email,
                password,
                role,
                manager.contact
                
            );
            let company = new Company(name,foundation_date,context,description,manager, RFC, address, cellphone);

            return await this.repository.registerCompany(user,company);
        }catch(error) {

        }
    }

}
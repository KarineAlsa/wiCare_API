import {User} from "../../Domain/Entity/User";
import companyInterface from "../../Domain/Port/CompanyInterface";

export default class ProfileDataCompanyCase {
    constructor(readonly companyRepository: companyInterface) {}

    async run(id:number): Promise<User | any> {
        try {
        const result = await this.companyRepository.getProfileDataCompany(id);
        if(result){
            result.id = id;
            
        }
        return result;
        } catch {
        return 'Ocurrió un error';
        }
    }
}
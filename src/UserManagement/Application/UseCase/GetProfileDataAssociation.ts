import {User} from "../../Domain/Entity/User";
import associatinoRepository from "../../Domain/Port/AssociationInterface";

export default class ProfileDataCase {
    constructor(readonly associatinoRepository: associatinoRepository) {}

    async run(id:number): Promise<User | any> {
        try {
        const result = await this.associatinoRepository.getProfileDataAssociation(id);
        if(result){
            result.id = id;
            const bank = await this.associatinoRepository.getBankInformation(id);
            result.bank = bank;
        }
        
        return result;
        } catch {
        return 'Ocurrió un error';
        }
    }
}
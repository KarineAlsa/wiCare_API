import {User} from "../../Domain/Entity/User";
import associatinoRepository from "../../Domain/Port/AssociationInterface";

export default class GetAssociationEvents {
    constructor(readonly associatinoRepository: associatinoRepository) {}

    async run(id:number): Promise<User | any> {
        try {
        const result = await this.associatinoRepository.getBankInformation(id);

        if(result){
            return {
                id: id,
                name: result.name,
                bank: result.bank,
                number: result.number,
                association_id: result.association_id
            };
        }
        else{
            return false;
        }
        } catch {
        return 'Ocurrió un error';
        }
    }
}
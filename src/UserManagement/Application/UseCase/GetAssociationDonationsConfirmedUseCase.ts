import {User} from "../../Domain/Entity/User";
import associatinoRepository from "../../Domain/Port/AssociationInterface";

export default class GetAssociationDonationsConfirmed {
    constructor(readonly associatinoRepository: associatinoRepository) {}

    async run(id:number): Promise<User | any> {
        try {
        const result = await this.associatinoRepository.getProfileDataAssociation(id);

        if(result){
            return {
                id: id,
                name: result.name,
                email: result.email,
                phone: result.phone,
                address: result.address,
                description: result.description,
                events: null
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
import { User } from "../../Domain/Entity/User";
import  AssociationInterface  from "../../Domain/Port/AssociationInterface";


export default class UpdateBankInformationUseCase {

    constructor(readonly repository:AssociationInterface) {}

    async run(id:string, updateFields:any):Promise<User|any> {
        try {

            return await this.repository.updateBankInformation(id,updateFields);

        }catch(error) {

        }
    }

}
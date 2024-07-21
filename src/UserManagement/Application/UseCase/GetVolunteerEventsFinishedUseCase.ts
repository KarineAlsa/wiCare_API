import {User} from "../../Domain/Entity/User";
import volunteerInterface from "../../Domain/Port/VolunteerInterface";

export default class GetVolunteerEventsFinished {
    constructor(readonly associatinoRepository: volunteerInterface) {}

    async run(id:number): Promise<User | any> {
        try {
        const result = await this.associatinoRepository.getProfileDataVolunteer(id);

        if(result){
            return result
        }
        else{
            return false;
        }
        } catch {
        return 'Ocurrió un error';
        }
    }
}
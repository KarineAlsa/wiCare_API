import {User} from "../../Domain/Entity/User";
import volunteerInterface from "../../Domain/Port/VolunteerInterface";

export default class ProfileDataVolunteerCase {
    constructor(readonly volunteerRepository: volunteerInterface) {}

    async run(id:number): Promise<User | any> {
        try {
        const result = await this.volunteerRepository.getProfileDataVolunteer(id);
        if(result){
            result.id = id;
            
        }
        return result;
        } catch {
        return 'Ocurrió un error';
        }
    }
}
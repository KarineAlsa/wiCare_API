import { User } from "../../Domain/Entity/User";
import { Contact } from "../../Domain/Entity/Contact";
import { Volunteer } from "../../Domain/Entity/Volunteer";
import  VolunteerInterface  from "../../Domain/Port/VolunteerInterface";

export default class RegisterUserUseCase {

    constructor(readonly repository:VolunteerInterface) {}

    async run( { email, password, role, contact,curp, occupation}: {
        email:string,
        password:string,
        role:string,
        contact:Contact
        curp:string,
        occupation:string
      } ):Promise<User|any> {
        try {

            let user = new User(
                email,
                password,
                role,
                contact
            );
            let volunteer = new Volunteer(curp,occupation,contact);

            return await this.repository.registerVolunteer(user,volunteer);
        }catch(error) {

        }
    }

}
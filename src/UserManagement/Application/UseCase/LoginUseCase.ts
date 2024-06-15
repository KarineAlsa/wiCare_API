import {User} from "../../Domain/Entity/User";
import userRepository from "../../Domain/Port/UserInterface";

export default class LoginUseCase {
    constructor(readonly userRepository: userRepository) {}

    async run(email:string, password:string): Promise<User | any> {
        try {
        const result = await this.userRepository.login(email,password);
        
        return result;
        } catch {
        return 'Ocurrió un error';
        }
    }
}
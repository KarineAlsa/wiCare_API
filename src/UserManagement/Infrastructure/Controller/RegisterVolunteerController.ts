import { Request, Response } from "express";
import  RegisterUseCase  from "../../Application/UseCase/RegisterVolunteerUseCase";
import { CryptService } from "../Dependencies";


export default class RegisterVolunteerController {

    constructor(readonly useCase:RegisterUseCase){}

    async run(request:Request,response:Response) {
        //La fecha de nacimiento tiene que ir en formato YYYY-MM-DD
        const { email, name, age,cellphone,address,genre, password, curp,occupation, postal} = request.body;
        
        if (!email || !name || !age || !password || !cellphone || !address || !genre || !curp || !occupation || !postal) {
            return response.status(400).json({
                message: "Debe completar todos los campos.",
                success: false
            });
        }
        if (postal.trim() ===""|| email.trim() === "" || name.trim() === "" || cellphone.trim() === "" || password.trim() === "" || address.trim() === "" || genre.trim() === "" || curp.trim() === "" || occupation.trim() === "") {
            return response.status(400).json({
                message: "Los campos no pueden estar vacíos.",
                success: false
            });
        }
        try {
            
            let user = await this.useCase.run({
                email: CryptService.generateCrypt(email),
                password: password,
                role: "volunteer",
                contact: {
                    name: CryptService.generateCrypt(name),
                    age: age,
                    cellphone: CryptService.generateCrypt(cellphone),
                    address: CryptService.generateCrypt(address),
                    genre:genre
                },
                curp:CryptService.generateCrypt(curp),
                occupation:occupation,
                postal:postal

            });
            if (user) {
                return response.status(200).json({data:user,message:"Voluntario creado",success:true});
            } else {
                response.status(400).send({
                    
                    message: "No se pudo crear el usuario voluntario",
                    success: false,
                });
            }
        } catch (error:any) {
            console.log(error)
            response.status(500).send({
                
                message: "Ha ocurrido un error durante su petición.",
                success:false
            });
        }
    }
    }
import { Request, Response } from "express";
import  RegisterUseCase  from "../../Application/UseCase/RegisterVolunteerUseCase";
import { CryptService } from "../Dependencies";
import validator from 'validator';

export default class RegisterVolunteerController {

    constructor(readonly useCase:RegisterUseCase){}

    async run(request:Request,response:Response) {
        //La fecha de nacimiento tiene que ir en formato YYYY-MM-DD
        const { email, name, age,cellphone,latitude,longitude,genre, password, curp,occupation, postal} = request.body;
        
        if (!email || !name || !age || !password || !cellphone || !genre || !curp || !occupation || !postal) {
            return response.status(400).json({
                message: "Debe completar todos los campos.",
                success: false
            });
        }
        if (postal.trim() ===""|| email.trim() === "" || name.trim() === "" || cellphone.trim() === "" || password.trim() === "" || genre.trim() === "" || curp.trim() === "" || occupation.trim() === "") {
            return response.status(400).json({
                message: "Los campos no pueden estar vacíos.",
                success: false
            });
        }
        if (!validator.isAlpha(name)){
            return response.status(400).json({
                message: "El nombre no es válido.",
                success: false
            });
        }
        if (!validator.isEmail(email)){
            return response.status(400).json({
                message: "El email no es válido.",
                success: false
            });
        }
        if (!validator.isMobilePhone(cellphone)){
            return response.status(400).json({
                message: "El número de celular no es válido.",
                success: false
            });
        }
        
        if (!validator.isStrongPassword(password)){
            return response.status(400).json({
                message: "La contraseña no es lo suficientemente segura.",
                success: false
            });
        }
        if (!validator.isPostalCode(postal, "any")){
            return response.status(400).json({
                message: "El código postal no es válido.",
                success: false
            });
        }
        if (!validator.isAlpha(occupation)){
            return response.status(400).json({
                message: "La ocupación no es válida.",
                success: false
            });
        }
        if (!validator.isAlpha(genre)){
            return response.status(400).json({
                message: "El género no es válido.",
                success: false
            });
        }
        if (!validator.isLatLong(latitude + "," + longitude)){
            return response.status(400).json({
                message: "Las coordenadas no son válidas.",
                success: false
            });
        }
        
        try {
            
            let user = await this.useCase.run({
                email: email,
                password: password,
                role: "volunteer",
                contact: {
                    name: name,
                    age: age,
                    cellphone: cellphone,
                    latitude:Number(latitude),
                    longitude:Number(longitude),
                    genre:genre
                },
                curp:CryptService.generateCrypt(curp.toUpperCase()),
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
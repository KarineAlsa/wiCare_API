import { Request, Response } from "express";
import  RegisterUseCase  from "../../Application/UseCase/RegisterCompanyUseCase";
import { CryptService } from "../Dependencies";
import validator from 'validator';
export default class RegisterCompanyController {

    constructor(readonly useCase:RegisterUseCase){}

    async run(request:Request,response:Response) {
        //La fecha de nacimiento tiene que ir en formato YYYY-MM-DD
        const { email, name,name_manager, age,cellphone, cellphone_manager,latitude,longitude, latitude_manager, longitude_manager,genre, password, position, foundation_date,context, description, RFC} = request.body;
        
        if (!email || 
            !name || 
            !age || 
            !password || 
            !cellphone || 
            !latitude ||
            !longitude ||
            !genre || 
            !position || 
            !foundation_date || 
            !context || 
            !description ||
            !RFC ||
            !latitude_manager ||
            !longitude_manager ||
            !name_manager ||
            !cellphone_manager) {
            return response.status(400).json({
                message: "Debe completar todos los campos.",
                success: false
            });
        }
        if (
            email.trim() === "" || 
            name.trim() === "" || 
            cellphone.trim() === "" || 
            password.trim() === "" || 
            
            genre.trim() === "" || 
            position.trim() === "" || 
            context.trim() === "" || 
            description.trim() === "" || 
            foundation_date.trim() === "" ||
            RFC.trim() === "" ||
            
            name_manager.trim() === "" ||
            cellphone_manager.trim() === ""){
            return response.status(400).json({
                message: "Los campos no pueden estar vacíos.",
                success: false
            });
        }
        if(!validator.isEmail(email)){
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
        
        if (!validator.isMobilePhone(cellphone_manager)){
            return response.status(400).json({
                message: "El número de celular del manager no es válido.",
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
        if (!validator.isLatLong(latitude_manager + "," + longitude_manager)){
            return response.status(400).json({
                message: "Las coordenadas del manager no son válidas.",
                success: false
            });
        }
                
       
        if (!validator.isAlphanumeric(RFC)){
            return response.status(400).json({
                message: "El RFC no es válido.",
                success: false
            });
        }

        try {
            
            let user = await this.useCase.run({
                name: name,
                email: email,
                password: password,
                role: "company",
                manager: {
                    contact: {
                        name: name_manager,
                        age: age,
                        cellphone: cellphone_manager,
                        latitude:Number(latitude_manager),
                        longitude:Number(longitude_manager),
                        genre:genre
                    },
                    position: position
                },
                foundation_date:new Date(foundation_date).toISOString().slice(0, 10),
                context:context,
                description:description, 
                RFC:RFC,
                latitude: Number(latitude),
                longitude:Number(longitude),
                cellphone: cellphone
            });
            if (user) {
                return response.status(200).json({data:user,message:"Company created",success:true});
            } else {
                response.status(400).send({
                    
                    message: "No se pudo crear el usuario compania",
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
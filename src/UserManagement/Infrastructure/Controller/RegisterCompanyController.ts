import { Request, Response } from "express";
import  RegisterUseCase  from "../../Application/UseCase/RegisterCompanyUseCase";
import { CryptService } from "../Dependencies";

export default class RegisterCompanyController {

    constructor(readonly useCase:RegisterUseCase){}

    async run(request:Request,response:Response) {
        //La fecha de nacimiento tiene que ir en formato YYYY-MM-DD
        const { email, name,name_manager, age,cellphone, cellphone_manager,address, address_manager,genre, password, position, foundation_date,context, description, RFC} = request.body;
        
        if (!email || 
            !name || 
            !age || 
            !password || 
            !cellphone || 
            !address || 
            !genre || 
            !position || 
            !foundation_date || 
            !context || 
            !description ||
            !RFC ||
            !address_manager ||
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
            address.trim() === "" || 
            genre.trim() === "" || 
            position.trim() === "" || 
            context.trim() === "" || 
            description.trim() === "" || 
            foundation_date.trim() === "" ||
            RFC.trim() === "" ||
            address_manager.trim() === "" ||
            name_manager.trim() === "" ||
            cellphone_manager.trim() === ""){
            return response.status(400).json({
                message: "Los campos no pueden estar vacíos.",
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
                        address: address_manager,
                        genre:genre
                    },
                    position: position
                },
                foundation_date:new Date(foundation_date).toISOString().slice(0, 10),
                context:context,
                description:description, 
                RFC:RFC,
                address: address,
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
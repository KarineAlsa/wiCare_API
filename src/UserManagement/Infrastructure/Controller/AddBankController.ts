import { Request, Response } from "express";
import  AddBankUseCase  from "../../Application/UseCase/AddBankUseCase";
import { CryptService } from "../Dependencies";

export default class AddBankAccountController {

    constructor(readonly useCase:AddBankUseCase){}

    async run(request:Request,response:Response) {
        //La fecha de nacimiento tiene que ir en formato YYYY-MM-DD
        const {  name, number, association_id, bank} = request.body;
        
        if (!name || !number || !association_id || !bank) {
            return response.status(400).json({
                message: "Debe completar todos los campos.",
                success: false
            });
        }
        if (
            name.trim() === "" || bank.trim() === "" || number.trim() === ""){
            return response.status(400).json({
                message: "Los campos no pueden estar vacíos.",
                success: false
            });
        }
        try {
            
            let bankAccount = await this.useCase.run({
                name: String(name),
                number: String(number),
                bank: String(bank),
                association_id: Number(association_id)
            });
            if (bankAccount) {
                return response.status(200).json({data:bankAccount,message:"Bank Account created",success:true});
            } else {
                response.status(400).send({
                    
                    message: "No se pudo crear el usuario asociación",
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
import { Request, Response } from "express";
import  AddBankUseCase  from "../../Application/UseCase/AddBankUseCase";
import { CryptService } from "../Dependencies";
const crypto = require('crypto');

export default class AddBankAccountController {

    constructor(readonly useCase:AddBankUseCase){}

    async run(request:Request,response:Response) {
   
        const {  name, number, bank} = request.body;
        const association_id = request.params.id;
        
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
                    
                    message: "No se pudo añadir la información de la cuenta bancaria.",
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
    
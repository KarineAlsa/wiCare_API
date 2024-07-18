import { Request, Response } from "express";
import  UpdateUseCase  from "../../Application/UseCase/UpdateBankInformationUseCase";

import { Bank } from "../../Domain/Entity/Bank";


export default class UpdateUserUseCaseController {

    constructor(readonly useCase:UpdateUseCase){}

    async run(request:Request,response:Response) {
        const id=request.params.id
        const updateFields: Partial<Bank> = request.body;
        if (!updateFields.name && !updateFields.bank && !updateFields.number) {
            return response.status(400).json({
                message: "Nada por actualizar",
                success: false
            });
        }
        if (updateFields.name?.trim() === "" || updateFields.bank?.trim() === "" || updateFields.number?.trim() === "") {
            return response.status(400).json({
                message: "Los campos no pueden estar vacíos.",
                success: false
            });
        }

        
        if (id !=""){

        try {
            
            let bank = await this.useCase.run(id, updateFields);
            if (bank) {
                
                return response.status(200).json({data:bank,message:"Información financiera actualizada",success:true});
            } else {
                response.status(400).send({
                    data: "No data",
                    message: "No se pudo actualizar la información de la cuenta bancaria.",
                    success: false,
                });
            }
        } catch (error) {
           
            response.status(500).send({
                data:error ,
                message: "Ha ocurrido un error durante su petición.",
                success:false
            });
        }
            

        }else{
            response.status(400).send({
                data:"Error",
                message: "Error",
                success:false
            });
        }
    }
    }
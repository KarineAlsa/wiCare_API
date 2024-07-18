import { Request, Response } from "express";
import  GetBankInformation  from "../../Application/UseCase/GetBankInformationUseCase";

export default class LoginController {

    constructor(readonly useCase:GetBankInformation){}

    async run(request:Request,response:Response) {
        const id = request.params.id;
        console.log(id)
        try {
            
            let bank = await this.useCase.run(Number(id));
           
            if (!bank){
                return response
                .status(404)
                .json({
                    message:"Association without existance",
                    success:false});
            }
            else{
                    return response
                    .status(200)
                    .json({
                        data: bank,
                        message:"Success",
                        success:true});
            
        }

        }catch(error:any) {
            response.status(error.http_status ?? 500)
                .json({
                    data:error,
                    message:"Error",
                    success:false
                });
        }
    }

}
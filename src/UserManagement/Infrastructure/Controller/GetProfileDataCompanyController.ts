import { Request, Response } from "express";
import  GetProfileDataCompany  from "../../Application/UseCase/GetProfileDataCompany";
import {AuthServices} from "../../Domain/Service/AuthService";
export default class ProfileCompanyController {

    constructor(readonly useCase:GetProfileDataCompany){}

    async run(request:Request,response:Response) {
        const id = request.params.id;
        console.log(id)
        try {
            
            let user = await this.useCase.run(Number(id));
           
            if (!user){
                return response
                .status(400)
                .json({
                    message:"Company without existance",
                    success:false});
            }
            else{
                console.log(user)
                return response
                .status(200)
                .json({
                    data: user,
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
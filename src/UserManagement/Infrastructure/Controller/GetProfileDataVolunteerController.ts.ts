import { Request, Response } from "express";
import  GetProfileDataAssociation  from "../../Application/UseCase/GetProfileDataVolunteer";
import {AuthServices} from "../../Domain/Service/AuthService";
export default class LoginController {

    constructor(readonly useCase:GetProfileDataAssociation){}

    async run(request:Request,response:Response) {
        const id = request.params.id;
        console.log(id)
        try {
            
            let user = await this.useCase.run(Number(id));
           
            if (!user){
                return response
                .status(400)
                .json({
                    message:"Usuario sin existir",
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
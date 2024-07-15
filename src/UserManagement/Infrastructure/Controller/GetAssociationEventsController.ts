import { Request, Response } from "express";
import  GetAssociationEvents  from "../../Application/UseCase/GetAssociationEventsUseCase";
import {AuthServices} from "../../Domain/Service/AuthService";
import sendMessageAndWaitForResponse from "../Service/SagaMessaging";
export default class LoginController {

    constructor(readonly useCase:GetAssociationEvents){}

    async run(request:Request,response:Response) {
        const id = request.params.id;
        console.log(id)
        try {
            
            let user = await this.useCase.run(Number(id));
           
            if (!user){
                return response
                .status(400)
                .json({
                    message:"Association without existance",
                    success:false});
            }
            else{
                
                const events = await sendMessageAndWaitForResponse('getEventsOfAssociation',{ associationId: id });

                
                if (events) {
                    return response
                    .status(200)
                    .json({
                        data: events,
                        message:"Success",
                        success:true});
            }
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
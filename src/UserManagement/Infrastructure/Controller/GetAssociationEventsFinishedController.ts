import { Request, Response } from "express";
import  GetAssociationEvents  from "../../Application/UseCase/GetAssociationEventsFinishedUseCase";
import {AuthServices} from "../../Domain/Service/AuthService";
import sendMessageAndWaitForResponse from "../Service/SagaMessaging";
import { getProfileDataAssociation } from "../Dependencies";
export default class LoginController {

    constructor(readonly useCase:GetAssociationEvents){}

    async run(request:Request,response:Response) {
        
        const id = request.params.id;
        
        try {
            console.log('Association ID:');
            
            let user = await this.useCase.run(Number(id));
           
            if (!user){
                return response
                .status(400)
                .json({
                    message:"Association without existance",
                    success:false});
            }
            else{
                
                let events = await sendMessageAndWaitForResponse('getEventsFinishedAssociation',{ associationId: id });

                
                if (events) {

                    
                    for (let i = 0; i < events.length; i++) {
                        let association = await getProfileDataAssociation.run(events[i].association_id);
                        events[i].association = association;
                    }
                    return response
                    .status(200)
                    .json({
                        data: events,
                        message:"Success",
                        success:true});
            
        }
        else{
            return response
            .status(400)
            .json({
                message:"Events without existance",
                success:false});
    }}

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
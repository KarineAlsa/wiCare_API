import { Request, Response } from "express";
import sendMessageAndWaitForResponse from "../Service/SagaMessaging";
import {getProfileDataAssociation, getProfileDataCompany } from "../Dependencies";
import GetVolunteerEventsComing from "../../Application/UseCase/GetVolunteerEventsComingUseCase";
export default class GetVolunteerEventsComingController {

    constructor(readonly useCase:GetVolunteerEventsComing){}

    async run(request:Request,response:Response) {
        const id_volunteer = request.params.id;
        console.log(id_volunteer)
        try {
            
            let user = await this.useCase.run(Number(id_volunteer));
           
            if (!user){
                return response
                .status(400)
                .json({
                    message:"Volunteer without existance",
                    success:false});
            }
            else{
                
                let events = await sendMessageAndWaitForResponse('getEventsComingVolunteer',{ volunteerId: id_volunteer });

                
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
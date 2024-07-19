import { Request, Response } from "express";
import sendMessageAndWaitForResponse from "../Service/SagaMessaging";
import {getProfileDataCompany } from "../Dependencies";
import GetAssociationDonationsPendings from "../../Application/UseCase/GetAssociationDonationsPendingUseCase";
export default class LoginController {

    constructor(readonly useCase:GetAssociationDonationsPendings){}

    async run(request:Request,response:Response) {
        const id_association = request.params.id;
        console.log(id_association)
        try {
            
            let user = await this.useCase.run(Number(id_association));
           
            if (!user){
                return response
                .status(400)
                .json({
                    message:"Association without existance",
                    success:false});
            }
            else{
                
                let donations = await sendMessageAndWaitForResponse('getDonationsOfAssociationPendings',{ associationId: id_association });

                
                if (donations) {

                    
                    for (let i = 0; i < donations.length; i++) {
                        let company = await getProfileDataCompany.run(donations[i].id_company);
                        donations[i].company = company;
                    }
                    return response
                    .status(200)
                    .json({
                        data: donations,
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
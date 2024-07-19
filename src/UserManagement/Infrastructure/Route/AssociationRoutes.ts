import  express  from "express";
import {   registerAssociationController, getProfileDataAssociationController, addBankAccountController, getAssociationEventsController, getBankInformationController, updateBankInformationController, getAssociationDonationsConfirmedController } from "../Dependencies";
import { VerifyToken } from "../Controller/Middleware/VerifyToken";
import { checkDataIntegrity } from "../Controller/Middleware/IntegrityMiddleware";
const associationRouter = express.Router();

associationRouter.post("/",registerAssociationController.run.bind(registerAssociationController));
associationRouter.get("/:id",VerifyToken,getProfileDataAssociationController.run.bind(getProfileDataAssociationController));
associationRouter.post("/:id/bank",VerifyToken,addBankAccountController.run.bind(addBankAccountController));
associationRouter.get("/:id/events",VerifyToken,getAssociationEventsController.run.bind(getAssociationEventsController));
associationRouter.get("/:id/bank",VerifyToken,getBankInformationController.run.bind(getBankInformationController));
associationRouter.put("/:id/bank",VerifyToken,updateBankInformationController.run.bind(updateBankInformationController));
associationRouter.get("/:id/donations/confirmed",VerifyToken,getAssociationDonationsConfirmedController.run.bind(getAssociationDonationsConfirmedController));

export default associationRouter;
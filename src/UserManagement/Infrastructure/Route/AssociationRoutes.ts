import  express  from "express";
import {   registerAssociationController, getProfileDataAssociationController, addBankAccountController } from "../Dependencies";
import { VerifyToken } from "../Controller/Middleware/VerifyToken";
import { checkDataIntegrity } from "../Controller/Middleware/IntegrityMiddleware";
const associationRouter = express.Router();

associationRouter.post("/",registerAssociationController.run.bind(registerAssociationController));
associationRouter.get("/:id",VerifyToken,getProfileDataAssociationController.run.bind(getProfileDataAssociationController));
associationRouter.post("/:id/bank",VerifyToken,addBankAccountController.run.bind(addBankAccountController));

export default associationRouter;
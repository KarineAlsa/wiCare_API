import  express  from "express";
import {   registerAssociationController, getProfileDataAssociationController } from "../Dependencies";
import { VerifyToken } from "../Controller/Middleware/VerifyToken";
const associationRouter = express.Router();

associationRouter.post("/",registerAssociationController.run.bind(registerAssociationController));
associationRouter.get("/:id",VerifyToken,getProfileDataAssociationController.run.bind(getProfileDataAssociationController));

export default associationRouter;
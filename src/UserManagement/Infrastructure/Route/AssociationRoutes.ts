import  express  from "express";
import {   registerAssociationController } from "../Dependencies";
const associationRouter = express.Router();

associationRouter.post("/",registerAssociationController.run.bind(registerAssociationController));

export default associationRouter;
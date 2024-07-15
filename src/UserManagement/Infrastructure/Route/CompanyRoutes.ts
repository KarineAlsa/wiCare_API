import  express  from "express";
import {   registerCompanyController, getProfileDataCompanyController} from "../Dependencies";
import { VerifyToken} from "../Controller/Middleware/VerifyToken";
import { checkDataIntegrity } from "../Controller/Middleware/IntegrityMiddleware";
const companyRouter = express.Router();

companyRouter.post("/", registerCompanyController.run.bind(registerCompanyController));
companyRouter.get("/:id",VerifyToken,getProfileDataCompanyController.run.bind(getProfileDataCompanyController));

export default companyRouter;
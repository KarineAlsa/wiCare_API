import  express  from "express";
import {   registerCompanyController } from "../Dependencies";
import { VerifyToken } from "../Controller/Middleware/VerifyToken";
const companyRouter = express.Router();

companyRouter.post("/",registerCompanyController.run.bind(registerCompanyController));

export default companyRouter;
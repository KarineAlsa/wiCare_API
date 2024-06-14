import  express  from "express";
import {   registerController } from "../Dependencies";
const volunteerRouter = express.Router();


volunteerRouter.post("/",registerController.run.bind(registerController));



export default volunteerRouter;
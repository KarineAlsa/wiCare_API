import  express  from "express";
import {   registerVolunteerController } from "../Dependencies";
const volunteerRouter = express.Router();

volunteerRouter.post("/",registerVolunteerController.run.bind(registerVolunteerController));

export default volunteerRouter;
import  express  from "express";
import {   registerVolunteerController, getProfileDataVolunteerController, getVolunteerEventsComingController } from "../Dependencies";
import { VerifyToken } from "../Controller/Middleware/VerifyToken";
import { checkDataIntegrity } from "../Controller/Middleware/IntegrityMiddleware";
const volunteerRouter = express.Router();

volunteerRouter.post("/",registerVolunteerController.run.bind(registerVolunteerController));
volunteerRouter.get("/:id",VerifyToken,getProfileDataVolunteerController.run.bind(getProfileDataVolunteerController));
volunteerRouter.get("/:id/events/coming",VerifyToken,getVolunteerEventsComingController.run.bind(getVolunteerEventsComingController));
volunteerRouter.get("/", (req, res) => {
    res.send("Hello World");
});

export default volunteerRouter;
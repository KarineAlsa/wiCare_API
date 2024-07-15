import  express  from "express";
import {   registerVolunteerController, getProfileDataVolunteerController } from "../Dependencies";
import { VerifyToken } from "../Controller/Middleware/VerifyToken";
import { checkDataIntegrity } from "../Controller/Middleware/IntegrityMiddleware";
const volunteerRouter = express.Router();

volunteerRouter.post("/",checkDataIntegrity,registerVolunteerController.run.bind(registerVolunteerController));
volunteerRouter.get("/:id",VerifyToken,getProfileDataVolunteerController.run.bind(getProfileDataVolunteerController));
volunteerRouter.get("/", (req, res) => {
    res.send("Hello World");
});

export default volunteerRouter;
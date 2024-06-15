import  express  from "express";
import {   registerVolunteerController } from "../Dependencies";
const volunteerRouter = express.Router();

volunteerRouter.post("/",registerVolunteerController.run.bind(registerVolunteerController));
volunteerRouter.get("/", (req, res) => {
    res.send('Hola mundo');
});


export default volunteerRouter;
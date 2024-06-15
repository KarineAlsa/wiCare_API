import  express  from "express";
import {   registerVolunteerController } from "../Dependencies";
import dotenv from 'dotenv'
const volunteerRouter = express.Router();
dotenv.config()
volunteerRouter.post("/",registerVolunteerController.run.bind(registerVolunteerController));
volunteerRouter.get("/", (req, res) => {
    res.send("Hello World ${process.env.HOST}");
});


export default volunteerRouter;
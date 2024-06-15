import  express  from "express";
import {   loginController } from "../Dependencies";
const userRoutes = express.Router();

userRoutes.post("/",loginController.run.bind(loginController));

export default userRoutes;
import  express  from "express";
import {   loginController, uploadProfilePictureController } from "../Dependencies";
import { upload } from '../../../config/multer';
import { VerifyToken } from "../Controller/Middleware/VerifyToken";
import { checkDataIntegrity } from "../Controller/Middleware/IntegrityMiddleware";

const userRoutes = express.Router();

userRoutes.post("/",loginController.run.bind(loginController));
userRoutes.put('/upload/:id',VerifyToken, checkDataIntegrity, upload.single('profilePicture'), uploadProfilePictureController.uploadProfilePicture.bind(uploadProfilePictureController));

export default userRoutes;
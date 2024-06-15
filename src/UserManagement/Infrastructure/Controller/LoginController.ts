import { Request, Response } from "express";
import  LoginUserCase  from "../../Application/UseCase/LoginUseCase";
import {AuthServices} from "../../Domain/Service/AuthService";
export default class LoginController {

    constructor(readonly useCase:LoginUserCase, readonly auth:AuthServices){}

    async run(request:Request,response:Response) {
        const { email,password} = request.body;
        if (!email || !password ) {
            return response.status(400).json({
                message: "Debe completar todos los campos.",
                success: false
            });
        }
        if (email.trim() === "" || password.trim() === "" ) {
            return response.status(400).json({
                message: "Los campos no pueden estar vacíos.",
                success: false
            });
        }
        try {
            
            let user = await this.useCase.run(email,password);
           
            if (!user){
                return response
                .status(401)
                .json({
                    message:"Revise credenciales",
                    success:false});
            }
            else{
                console.log(user)
                return response
                .status(200)
                .json({
                    data: user,
                    token: this.auth.generateToken(user),
                    message:"Login exitoso", 
                    success:true});
            }
            

        }catch(error:any) {
            response.status(error.http_status ?? 500)
                .json({
                    data:error,
                    message:"Error",
                    success:false
                });
        }
    }

}
import { Request,Response } from "express";

export interface IntegrityServices {
    checkDataIntegrity(request: Request, response:Response): any;

}
import dotenv from 'dotenv';
import crypto from 'crypto';
import { IntegrityServices } from '../../Domain/Service/IntegrityService';
import { Request, Response } from "express";
dotenv.config();

export class Integrity implements IntegrityServices {
    private readonly key: string;

    constructor() {
        this.key = process.env.SECRET || '';
    }
    checkDataIntegrity(request: Request, response:Response): any {
        const providedSignature = request.headers['X-Signature'] as string;

        if (!providedSignature) {
            return false
        }

        const dataJSON = JSON.stringify(request.body);
        const signature = crypto.createHmac('sha256', process.env.SECRET_KEY || '').update(dataJSON).digest('hex');
        if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(providedSignature))) {
           return true
        } else {
            false
        }
        
    }

}
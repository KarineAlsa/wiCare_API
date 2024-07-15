import { Request, Response } from 'express';
import  uploadProfilePictureUseCase  from '../../Application/UseCase/UploadProfileUseCase';
import { upload } from '../../../config/multer';

export default class ProfileController {

    constructor(readonly useCase:uploadProfilePictureUseCase){}
    async uploadProfilePicture(req:any, res:any) {

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file?.buffer;
    const fileName = req.file?.originalname;
    const mimeType = req.file?.mimetype;
    const id = req.params.id;

    if (!file || !fileName || !mimeType) {
      return res.status(400).json({ error: 'File upload failed' });
    }

    try {
      const fileUrl = await this.useCase.execute(file, fileName, mimeType, id);
      res.json({ data: fileUrl ,message:"Perfil actualizado",success:true});
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  };
}


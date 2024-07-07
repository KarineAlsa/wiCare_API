import { IStorageService } from '../../Domain/Service/IStorageService';
import UserInterface from '../../Domain/Port/UserInterface';

export default class UploadProfilePictureUseCase {
  constructor(readonly repository: UserInterface,private storageService: IStorageService) {}

  async execute(file: Buffer, fileName: string, mimeType: string, id:any): Promise<any> {
    try {
      const hasAlready = await this.repository.getProfileData(id);
      if (hasAlready.photoURL) {
        await this.storageService.deleteProfilePicture(hasAlready.photoURL);
      }
      const fileUrl = await this.storageService.uploadProfilePicture(file, fileName, mimeType);
      const user = await this.repository.uploadPhoto(fileUrl, id);
      return user;

    }catch(error:any){
      throw new Error(error.message);
      
    }
  }
}

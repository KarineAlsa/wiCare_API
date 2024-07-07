
export interface IStorageService {
    uploadProfilePicture(file: Buffer, fileName: string, mimeType: string): Promise<string>;
    deleteProfilePicture(url:string): Promise<boolean>
  }
  
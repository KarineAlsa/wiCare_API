import RegisterVolunteerUseCase from "../Application/UseCase/RegisterVolunteerUseCase";
import RegisterCompanyUseCase from "../Application/UseCase/RegisterCompanyUseCase";
import RegisterAssociationUseCase from "../Application/UseCase/RegisterAssociationUseCase";
import LoginUseCase from "../Application/UseCase/LoginUseCase";
import GetProfileDataAssociation from "../Application/UseCase/GetProfileDataAssociation";
import GetProfileDataVolunteer from "../Application/UseCase/GetProfileDataVolunteer";
import GetProfileDataCompany from "../Application/UseCase/GetProfileDataCompany"
import UploadProfilePictureUseCase from "../Application/UseCase/UploadProfileUseCase";
import AddBankUseCase from "../Application/UseCase/AddBankUseCase";

import VolunteerMySQLRepository from "./Repository/VolunteerRepositoryMySQL"
import AssociationMySQLRepository from "./Repository/AssociationRepositoryMySQL"
import UserMySQLRepository from "./Repository/UserMySQLRepository"
import CompanyMySQLRepository from "./Repository/CompanyRepositoryMySQL"

import {JWTS} from "./Service/JWT"
import {Crypt} from "./Service/EncryptService"
import { S3StorageService } from './Service/S3Storage';
import { Integrity } from "./Service/IntegrityService";

export const JWT = new JWTS();
export const CryptService = new Crypt();
export const S3Storage = new S3StorageService()
export const IntegrityService = new Integrity()

import RegisterVolunteerController from './Controller/RegisterVolunteerController'
import RegisterAssociationController from "./Controller/RegisterAssociationController";
import RegisterCompanyController from "./Controller/RegisterCompanyController";
import LoginController from "./Controller/LoginController";
import GetProfileDataAssociationController from "./Controller/GetProfileDataAssociationController";
import GetProfileDataVolunteerController from "./Controller/GetProfileDataVolunteerController.ts";
import GetProfileDataCompanyController from "./Controller/GetProfileDataCompanyController"
import UploadProfilePictureController from "./Controller/UploadProfileController";
import AddBankAccountController from "./Controller/AddBankController";

export const MySqlVolunteerRepository = new VolunteerMySQLRepository();
export const VolunteerRepository =  MySqlVolunteerRepository
export const MySqlAssociationRepository = new AssociationMySQLRepository();
export const AssociationRepository =  MySqlAssociationRepository
export const MySqlUserRepository = new UserMySQLRepository();
export const MySqlCompanyRepository = new CompanyMySQLRepository();

export const registerVolunteerCase = new RegisterVolunteerUseCase(VolunteerRepository);
export const registerAssociationCase = new RegisterAssociationUseCase(AssociationRepository);
export const registerCompanyCase =  new RegisterCompanyUseCase(MySqlCompanyRepository)
export const loginCase = new LoginUseCase(MySqlUserRepository);
export const getProfileDataAssociation = new GetProfileDataAssociation(MySqlAssociationRepository);
export const getProfileDataVolunteer = new GetProfileDataVolunteer(MySqlVolunteerRepository);
export const getProfileDataCompany = new GetProfileDataCompany(MySqlCompanyRepository)
export const uploadProfilePictureUseCase = new UploadProfilePictureUseCase(MySqlUserRepository, S3Storage)
export const addBankUseCase = new AddBankUseCase(MySqlAssociationRepository)

export const registerVolunteerController = new RegisterVolunteerController(registerVolunteerCase);
export const registerAssociationController = new RegisterAssociationController(registerAssociationCase);
export const registerCompanyController = new RegisterCompanyController(registerCompanyCase)
export const loginController = new LoginController(loginCase, JWT);
export const getProfileDataAssociationController = new GetProfileDataAssociationController(getProfileDataAssociation);
export const getProfileDataVolunteerController = new GetProfileDataVolunteerController(getProfileDataVolunteer);
export const getProfileDataCompanyController = new GetProfileDataCompanyController(getProfileDataCompany)
export const uploadProfilePictureController = new UploadProfilePictureController(uploadProfilePictureUseCase)
export const addBankAccountController = new AddBankAccountController(addBankUseCase);
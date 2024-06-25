import RegisterVolunteerUseCase from "../Application/UseCase/RegisterVolunteerUseCase";
import RegisterAssociationUseCase from "../Application/UseCase/RegisterAssociationUseCase";
import LoginUseCase from "../Application/UseCase/LoginUseCase";
import GetProfileDataAssociation from "../Application/UseCase/GetProfileDataAssociation";
import GetProfileDataVolunteer from "../Application/UseCase/GetProfileDataVolunteer";

import VolunteerMySQLRepository from "./Repository/VolunteerRepositoryMySQL"
import AssociationMySQLRepository from "./Repository/AssociationRepositoryMySQL"
import UserMySQLRepository from "./Repository/UserMySQLRepository"

import {JWTS} from "./Service/JWT"
import {Crypt} from "./Service/EncryptService"

export const JWT = new JWTS();
export const CryptService = new Crypt();

import RegisterVolunteerController from './Controller/RegisterVolunteerController'
import RegisterAssociationController from "./Controller/RegisterAssociationController";
import LoginController from "./Controller/LoginController";
import GetProfileDataAssociationController from "./Controller/GetProfileDataAssociationController";
import GetProfileDataVolunteerController from "./Controller/GetProfileDataVolunteerController.ts";

export const MySqlVolunteerRepository = new VolunteerMySQLRepository();
export const VolunteerRepository =  MySqlVolunteerRepository
export const MySqlAssociationRepository = new AssociationMySQLRepository();
export const AssociationRepository =  MySqlAssociationRepository
export const MySqlUserRepository = new UserMySQLRepository();

export const registerVolunteerCase = new RegisterVolunteerUseCase(VolunteerRepository);
export const registerAssociationCase = new RegisterAssociationUseCase(AssociationRepository);
export const loginCase = new LoginUseCase(MySqlUserRepository);
export const getProfileDataAssociation = new GetProfileDataAssociation(MySqlAssociationRepository);
export const getProfileDataVolunteer = new GetProfileDataVolunteer(MySqlVolunteerRepository);

export const registerVolunteerController = new RegisterVolunteerController(registerVolunteerCase);
export const registerAssociationController = new RegisterAssociationController(registerAssociationCase);
export const loginController = new LoginController(loginCase, JWT);
export const getProfileDataAssociationController = new GetProfileDataAssociationController(getProfileDataAssociation);
export const getProfileDataVolunteerController = new GetProfileDataVolunteerController(getProfileDataVolunteer);
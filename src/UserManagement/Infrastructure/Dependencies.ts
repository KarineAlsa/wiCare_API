import RegisterVolunteerUseCase from "../Application/UseCase/RegisterVolunteerUseCase";
import RegisterAssociationUseCase from "../Application/UseCase/RegisterAssociationUseCase";

import VolunteerMySQLRepository from "./Repository/VolunteerRepositoryMySQL"
import AssociationMySQLRepository from "./Repository/AssociationRepositoryMySQL"

import RegisterVolunteerController from './Controller/RegisterVolunteerController'
import RegisterAssociationController from "./Controller/RegisterAssociationController";

export const MySqlVolunteerRepository = new VolunteerMySQLRepository();
export const VolunteerRepository =  MySqlVolunteerRepository
export const MySqlAssociationRepository = new AssociationMySQLRepository();
export const AssociationRepository =  MySqlAssociationRepository

export const registerVolunteerCase = new RegisterVolunteerUseCase(VolunteerRepository);
export const registerAssociationCase = new RegisterAssociationUseCase(AssociationRepository);

export const registerVolunteerController = new RegisterVolunteerController(registerVolunteerCase);
export const registerAssociationController = new RegisterAssociationController(registerAssociationCase);
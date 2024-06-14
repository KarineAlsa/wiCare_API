import RegisterVolunteerUseCase from "../Application/UseCase/RegisterVolunteerUseCase";

import UserMySQLRepository from "./Repository/VolunteerRepositoryMySQL"

import RegisterVolunteerController from './Controller/RegisterVolunteerController'

export const MySqlUserRepository = new UserMySQLRepository();
export const currentRepository =  MySqlUserRepository

export const registerCase = new RegisterVolunteerUseCase(currentRepository);

export const registerController = new RegisterVolunteerController(registerCase);
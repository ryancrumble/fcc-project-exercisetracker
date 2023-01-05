import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../errors/HTTPException.js';
import ExercisesService from '../services/exercises.service.js';
import UsersService from '../services/users.service.js';
import { CreateExerciseResponse } from '../types/exercise.js';

class UsersControllers {
    public exercisesService: ExercisesService;
    public usersService: UsersService;

    constructor() {
        this.exercisesService = new ExercisesService();
        this.usersService = new UsersService();
    }

    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const payload = req.body;

            const createUserData = await this.usersService.createUser(payload);

            res.status(200).json(createUserData);
        } catch (error) {
            next(error);
        }
    };

    public getUserById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId = req.params._id;

            const userData = await this.usersService.getUserById(userId);

            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    };

    public getUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const usersData = await this.usersService.getUsers();

            res.status(200).json(usersData);
        } catch (error) {
            next(error);
        }
    };

    public createExercise = async (
        req: Request,
        res: Response<CreateExerciseResponse>,
        next: NextFunction
    ) => {
        try {
            const payload = req.body;
            const userId = req.params._id;

            const user = await this.usersService.getUserById(userId);

            if (!user) {
                return new HttpException(409, 'No user found with the id.');
            }

            const exerciseData = await this.exercisesService.createExercise({
                ...payload,
                username: user.username,
            });

            res.status(200).json(exerciseData);
        } catch (error) {
            next(error);
        }
    };
}

export default UsersControllers;

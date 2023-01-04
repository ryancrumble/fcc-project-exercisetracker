import { NextFunction, Request, Response } from 'express';
import UserService from '../services/users.service.js';

class UsersControllers {
    public userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public addUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userPayload = req.body;
            const createUserData = await this.userService.createUser(
                userPayload
            );

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

            const userData = await this.userService.getUserById(userId);

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
            const usersData = await this.userService.getUsers();

            res.status(200).json(usersData);
        } catch (error) {
            next(error);
        }
    };
}

export default UsersControllers;

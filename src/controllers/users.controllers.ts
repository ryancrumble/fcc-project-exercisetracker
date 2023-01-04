import { NextFunction, Request, Response } from 'express';
import UserService from '../services/users.service.js';

class UsersControllers {
    public userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public createUser = async (
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
}

export default UsersControllers;

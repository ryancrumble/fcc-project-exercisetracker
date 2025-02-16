import { Router } from 'express';
import UsersControllers from '../controllers/users.controllers.js';
import { Routes } from '../types/routes.js';

class UsersRoute implements Routes {
    public path = '/api/users';
    public router = Router();
    public usersController = new UsersControllers();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, this.usersController.createUser);
        this.router.get(this.path, this.usersController.getUsers);
        this.router.get(this.path + '/:_id', this.usersController.getUserById);
        this.router.post(
            this.path + '/:_id/exercises',
            this.usersController.createExercise
        );
        this.router.get(
            this.path + '/:_id/logs',
            this.usersController.getExercises
        );
    }
}

export default UsersRoute;

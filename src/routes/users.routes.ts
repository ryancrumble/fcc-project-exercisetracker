import { Router } from 'express';
import { Routes } from '../types/routes.js';
import UsersControllers from '../controllers/users.controllers.js';

class UsersRoute implements Routes {
    public path = '/api/users';
    public router = Router();
    public usersController = new UsersControllers();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, this.usersController.addUser);
        this.router.get(this.path, this.usersController.getUsers);
        this.router.get(this.path + '/:_id', this.usersController.getUserById);
    }
}

export default UsersRoute;

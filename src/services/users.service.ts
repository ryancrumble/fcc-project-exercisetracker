import { HttpException } from '../errors/HTTPException.js';
import userModel from '../models/user.models.js';
import { User } from '../types/users.js';

class UsersService {
    public users: typeof userModel;

    constructor() {
        this.users = userModel;
    }

    public async createUser(payload: Pick<User, 'username'>): Promise<User> {
        // @TODO: Validate payload

        const user = await this.users.findOne({
            username: payload.username,
        });

        if (user) {
            throw new HttpException(
                409,
                `The username '${payload.username}' already exists`
            );
        }

        return await this.users.create(payload);
    }

    public async getUserById(userId: string): Promise<User> {
        const user = await this.users.findById(userId);

        if (!user) {
            throw new HttpException(204, 'No user found');
        }

        return user;
    }

    public async getUsers(): Promise<User[]> {
        const users = await this.users.find();

        if (!users.length) {
            throw new HttpException(204, 'No users found in the database');
        }

        return users;
    }
}

export default UsersService;

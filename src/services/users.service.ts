import { HttpException } from '../errors/HTTPException.js';
import { User } from '../types/users.js';
import userModel from '../models/users.models.js';

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
}

export default UsersService;

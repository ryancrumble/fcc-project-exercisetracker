import { model, Schema } from 'mongoose';
import { User } from '../types/users.js';

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
});

const userModel = model<User>('User', userSchema);

export default userModel;

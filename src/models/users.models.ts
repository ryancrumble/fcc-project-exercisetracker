import { Document, Schema, model } from 'mongoose';
import { User } from '../types/users.js';

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;

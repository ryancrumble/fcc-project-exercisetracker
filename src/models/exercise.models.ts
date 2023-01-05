import { model, Schema } from 'mongoose';
import { ExerciseSchema } from '../types/exercise.js';

const exerciseSchema: Schema<ExerciseSchema> = new Schema(
    {
        description: {
            type: String,
            required: true,
            maxlength: 256,
        },
        duration: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
    },
    { versionKey: false }
);

const exerciseModel = model('Exercise', exerciseSchema);

export default exerciseModel;

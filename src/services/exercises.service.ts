import { HttpException } from '../errors/HTTPException.js';
import exerciseModel from '../models/exercise.models.js';
import { CreateExerciseRequest, ExerciseSchema } from '../types/exercise.js';

class ExercisesService {
    public exercises: typeof exerciseModel;

    constructor() {
        this.exercises = exerciseModel;
    }

    public async createExercise(
        payload: CreateExerciseRequest
    ): Promise<ExerciseSchema> {
        const { description, date } = payload;

        if (description.length > 256) {
            throw new HttpException(
                409,
                'Description length of exercise is too long. Please provide a shorter description.'
            );
        }

        if (date && new Date(date).toString() === 'Invalid Date') {
            throw new HttpException(
                409,
                'Date is not valid. Please check the format of the date.'
            );
        }

        const newExercise: ExerciseSchema = {
            ...payload,
            date: date ?? new Date(),
        };

        return await this.exercises.create(newExercise);
    }

    public async getExercises(userId: string): Promise<ExerciseSchema[]> {
        const exercises = await this.exercises.find({ userId }, { userId: 0 });

        if (!exercises) {
            throw new HttpException(204, 'No exercises found for the user');
        }

        return exercises;
    }
}

export default ExercisesService;

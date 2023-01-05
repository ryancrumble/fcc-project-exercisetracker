import { HttpException } from '../errors/HTTPException.js';
import exerciseModel from '../models/exercise.models.js';
import {
    CreateExerciseRequest,
    ExerciseSchema,
    GetExercisesQueries,
} from '../types/exercise.js';

class ExercisesService {
    public exercises: typeof exerciseModel;

    constructor() {
        this.exercises = exerciseModel;
    }

    public async createExercise(payload: CreateExerciseRequest) {
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

        const res = await this.exercises.create(newExercise);

        // To pass project tests
        return {
            _id: res._id,
            username: res.username,
            date: res.date.toDateString(),
            duration: res.duration,
            description: res.description,
        };
    }

    public async getExercises(username: string, queries: GetExercisesQueries) {
        const { from, to, limit } = queries;

        // Validate from value
        if (from && new Date(from).toString() === 'Invalid Date') {
            throw new HttpException(
                409,
                'Invalid date provided to "from". Please check the date provided'
            );
        }

        // Validate to value
        if (to && new Date(to).toString() === 'Invalid Date') {
            throw new HttpException(
                409,
                'Invalid date provided to "to". Please check the date provided'
            );
        }

        // Validate limit value
        if (limit && isNaN(Number(limit))) {
            throw new HttpException(
                409,
                'Incorrect value for limit. Please provide a number.'
            );
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filters: any = {
            username,
        };

        if (from) {
            filters.date = { $gte: new Date(from) };
        }

        if (to) {
            filters.date = { ...filters.date, $lte: new Date(to) };
        }

        const _limit = limit ? Number(limit) : 0;

        const getExercises = this.exercises
            .find(filters, { _id: 0, username: 0 })
            .limit(_limit);

        const getCount = this.exercises
            .find(filters, { _id: 0, username: 0 })
            .limit(_limit)
            .count();

        const [exercises, count] = await Promise.all([getExercises, getCount]);

        if (!exercises) {
            throw new HttpException(204, 'No getExercises found for the user');
        }

        // Format results to satisfy fcc test
        const formattedExercises = exercises.map(
            ({ date, duration, description }) => {
                return { date: date.toDateString(), duration, description };
            }
        );

        return { exercises: formattedExercises, count };
    }
}

export default ExercisesService;

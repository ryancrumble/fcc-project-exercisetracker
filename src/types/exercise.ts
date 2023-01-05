export interface ExerciseSchema {
    description: string;
    duration: number;
    date: Date;
    username: string;
}

export interface Exercise extends ExerciseSchema {
    _id: string;
}

export interface CreateExerciseRequest extends Omit<ExerciseSchema, 'date'> {
    date?: Date;
}

export interface CreateExerciseResponse extends CreateExerciseRequest {
    username: string;
}

export interface UserLogsResponse {
    _id: string;
    username: string;
    count: number;
    log: Exercise[];
}

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { publicDir } from './config/index.js';
import { Routes } from './types/routes.js';

dotenv.config();

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(routes: Routes[]) {
        this.app = express();
        this.env = process.env.NODE_ENV || 'development';
        this.port = process.env.PORT || 4000;

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeStaticAssets();
        this.initializeRoutes(routes);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(
                '\x1b[36m %s\x1b[0m',
                `Your app is listening on port ${this.port}`
            );
        });
    }

    public getServer() {
        return this.app;
    }

    private connectToDatabase() {
        mongoose.set('strictQuery', false);

        mongoose
            .connect(process.env.MONGO_URI as string, {
                dbName: 'exercise-tracker',
            })
            .then(() =>
                console.log('\x1b[33m %s\x1b[0m', 'Connected to database')
            )
            .catch((error) =>
                console.error(
                    '\x1b[31m %s\x1b[0m',
                    'Error connecting to database:',
                    error
                )
            );
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeStaticAssets() {
        this.app.use(express.static(publicDir));
        this.app.use('/public', express.static(publicDir));
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }
}

export default App;

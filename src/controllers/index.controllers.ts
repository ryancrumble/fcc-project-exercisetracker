import { NextFunction, Request, Response } from 'express';
import { rootDir } from '../config/index.js';

class IndexController {
    public index = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.sendFile(rootDir + '/views/index.html');
        } catch (error) {
            next(error);
        }
    };
}

export default IndexController;

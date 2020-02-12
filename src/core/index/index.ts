import { Request, Response, NextFunction } from 'express';

export class Index {

    public indexData(req: Request, res: Response, next: NextFunction) {
        res.render('index', { title: 'Express' });
    }

}

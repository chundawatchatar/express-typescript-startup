import { Request, Response, NextFunction } from 'express';

export class User {

    public index(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        res.send({valid: false});
    }
}

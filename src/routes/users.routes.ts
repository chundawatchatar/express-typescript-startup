import * as express from 'express';
import { User } from '../core/user/user';

export class UserRoutes {

  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    const userCore = new User();
    this.router.get('', userCore.index);
  }

}

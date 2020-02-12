import * as express from 'express';
import { Index } from '../core/index/index';

export class IndexRoute {

  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    const indexCore = new Index();
    this.router.get('', indexCore.indexData);
  }
}


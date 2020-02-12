import * as createError from 'http-errors';
import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import { Application, Request, Response, NextFunction } from 'express';

import { IndexRoute } from './routes/index.routes';
import { UserRoutes } from './routes/users.routes';

export class App {
  public app: Application;
  private port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();

    this.initializeTemplateEngion();
    this.registerMiddlewares();
    this.registerAssets();
    this.registerRoutes();
    this.registerError404();
    this.registerErrorsHandler();
  }

  // view engine setup
  private initializeTemplateEngion() {
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');
  }

  private registerMiddlewares() {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  private registerAssets() {
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  private registerRoutes() {
    this.app.use('/', new IndexRoute().router);
    this.app.use('/user', new UserRoutes().router);
  }

  private registerError404() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next(createError(404));
    });
  }

  // error handler
  private registerErrorsHandler() {
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }

}

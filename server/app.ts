import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
const app = express();

// Importing routers...
import accountRouter from './routes/accountRouter';
import adminRouter from './routes/adminRouter';
import apiRouter from './routes/apiRouter';
import commandRouter from './routes/commandRouter';
import dbRouter from './routes/dbRouter';
import initRouter from './routes/initRouter';
import loginRouter from './routes/loginRouter';
import logoutRouter from './routes/logoutRouter';
import settingsRouter from './routes/settingsRouter';
import signupRouter from './routes/signupRouter';
import { ServerError } from '../types';

// Enabling middleware...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Defining routers...
app.use('/account', accountRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);
app.use('/command', commandRouter);
app.use('/db', dbRouter);
app.use('/init', initRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/settings', settingsRouter);
app.use('/signup', signupRouter);

// Handling requests to unknown endpoints...
app.use('/', (req: Request, res: Response) => {
  return res
    .status(404)
    .send({ error: 'Unknown endpoint — please try again.' });
});

// Handling global errors...
app.get(
  '/',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: ServerError, req: Request, res: Response, next: NextFunction) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occured' },
    };
    const errorObj: ServerError = Object.assign(defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

// Exporting app...
export default app;

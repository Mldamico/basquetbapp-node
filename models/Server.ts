import express from 'express';
import cors from 'cors';
import userRoutes from '../routes/user';
import authRoutes from '../routes/auth';
import matchRoutes from '../routes/match';

class Server {
  private app: express.Application;
  private port: string;
  private userRoutesPath: string;
  private authRoutesPath: string;
  private matchRoutesPath: string;
  constructor() {
    this.port = process.env.PORT!;
    this.app = express();
    this.userRoutesPath = '/api/users';
    this.authRoutesPath = '/api/auth';
    this.matchRoutesPath = '/api/match';

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.userRoutesPath, userRoutes);
    this.app.use(this.authRoutesPath, authRoutes);
    this.app.use(this.matchRoutesPath, matchRoutes);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Running at ${this.port}`);
    });
  }
}

export default Server;

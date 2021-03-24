import express from 'express';
import cors from 'cors';
import userRoutes from '../routes/user';
import authRoutes from '../routes/auth';

class Server {
  private app: express.Application;
  private port: string;
  private userRoutesPath: string;
  private authRoutesPath;
  constructor() {
    this.port = process.env.PORT!;
    this.app = express();
    this.userRoutesPath = '/api/users';
    this.authRoutesPath = '/api/auth';

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
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Running at ${this.port}`);
    });
  }
}

export default Server;

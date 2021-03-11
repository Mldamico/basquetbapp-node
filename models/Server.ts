import express from 'express';
import cors from 'cors';
import userRoutes from '../routes/user';

class Server {
  private app: express.Application;
  private port: string;
  private userRoutesPath: string;
  constructor() {
    this.port = process.env.PORT!;
    this.app = express();
    this.userRoutesPath = '/api/user';

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.userRoutesPath, userRoutes);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Running at ${this.port}`);
    });
  }
}

export default Server;

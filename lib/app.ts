import * as express from 'express';
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import { Routes } from './routes';

class App {
    public app: express.Application;
    public route: Routes = new Routes();
    public mongoUrl: string = 'mongodb://localhost/todoDb';

    constructor() {
        this.app = express();
        this.config();
        this.route.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());

        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false}));
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}

export default new App().app;
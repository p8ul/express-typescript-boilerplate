import { Request, Response } from 'express';
import { TodoRoutes } from './todo';
import { UserRoutes } from './user';

export class Routes {
    public todoRoutes: TodoRoutes = new TodoRoutes();
    public userRoutes: UserRoutes = new UserRoutes();

    public routes(app): void {
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: "Welcome to the awesome api.. :)!!"
            });
        });
        this.todoRoutes.routes(app);
        this.userRoutes.routes(app);
        
    }
}
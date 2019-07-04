import { UserController } from '../../controllers/user';
import { userExistValidator } from './validator';

export class UserRoutes {
    public userController: UserController = new UserController();

    public routes(app): void {
        
        // Todos
        app.route('/user')
        // GET endpoint
        .get(this.userController.getUsers)

        // POST endpoint
        .post([userExistValidator], this.userController.addNewUser);

        // todo detail
        app.route('/user/:userId')
        // get specific todo
        .get(this.userController.getUserWithId)
        .put(this.userController.updateUser)
        .delete(this.userController.deleteUser)

        app.route('/login').post(this.userController.login)
    }
}
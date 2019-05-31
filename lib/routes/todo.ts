import { TodoController } from '../controllers/todo';

export class TodoRoutes {
    public todoController: TodoController = new TodoController();

    public routes(app): void {
        
        // Todos
        app.route('/todo')
        // GET endpoint
        .get(this.todoController.getTodos)

        // POST endpoint
        .post(this.todoController.addNewTodo);

        // todo detail
        app.route('/todo/:todoId')
        // get specific todo
        .get(this.todoController.getTodoWithId)
        .put(this.todoController.updateTodo)
        .delete(this.todoController.deleteTodo)
    }
}
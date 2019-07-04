import * as mongoose from 'mongoose';
import { TodoSchema } from './../models/todos';
import { Request, Response } from 'express';

const Todo = mongoose.model('Todo', TodoSchema);

export class TodoController {
    public addNewTodo (req: Request & {user: any}, res: Response) {
        let newTodo = new Todo({...req.body, user: req.user._id});
        newTodo.save((err, todo) => {
            if (err) {
                return res.send(err);
            } 
            res.status(201).json(todo);
        });
    }

    public async getTodos (req: Request, res: Response) {
        const todos  =  await Todo.find({}).select('-__v').populate('user', '-password -__v');
        res.json(todos)
    }

    public getTodo (req: Request, res: Response) {
        Todo.findById(req.params.todoId, (err, todo) => {
            if (err) {
                return res.send(err);
            }
            return res.json(todo);
        });
    }

    public updateTodo (req: Request, res: Response) {
        Todo.findOneAndUpdate({_id: req.params.todoId }, req.body, { new: true }, (err, todo) => {
            if (err) {
                return res.send(err);
            }
            return res.json(todo);
        });
    }

    public deleteTodo (req: Request, res: Response) {
        Todo.remove({_id: req.params.todoId }, (err, todo) => {
            if (err) {
                return res.send(err);
            }
            res.json({message: 'Succesfully deleted todo!'});
        });
    }
}
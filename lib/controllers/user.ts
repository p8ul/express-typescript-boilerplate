import * as mongoose from 'mongoose';
import { UserSchema } from './../models/user';
import { Request, Response } from 'express';
import { generateToken } from '../utils/auth';

const User = mongoose.model('User', UserSchema);

export class UserController {
    public addNewUser (req: Request, res: Response) {
        let newUser = new User(req.body);

        newUser.save((err, user) => {
            if (err) {
                return res.send(err);
            } 
            res.status(201).json({token: generateToken(user)});
        });
    }

    public getUsers (req: Request, res: Response) {
        User.find({},{password: 0}, (err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users)
        });
    }

    public getUserWithId (req: Request, res: Response) {
        User.findById(req.params.userId, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public login (req: Request, res: Response) {
        User.findOne({email: req.body.email}, (err, user) => {
            if (err || !user) return res.status(404).json({message: 'User not found!'});
                
            user.comparePassword(req.body.password.toString(), (error, isMatch) => {
                if (error) return res.status(404).json({message: 'Email or password do not match!'});
                if (isMatch) return res.status(201).json({token: generateToken(user)});
            
                return res.status(404).json({message: 'Email or password do not match!'});
                
            });
        })
    }

    public updateUser (req: Request, res: Response) {
        User.findOneAndUpdate({_id: req.params.userId }, req.body, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public deleteUser (req: Request, res: Response) {
        User.remove({_id: req.params.userId }, (err, todo) => {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Succesfully deleted user!'});
        });
    }
}
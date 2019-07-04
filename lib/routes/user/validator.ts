import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { UserSchema } from '../../models/user';

const User = mongoose.model('User', UserSchema);

export const userExistValidator = async (req: Request, res: Response, next) => {
    const user = await User.findOne({ $or: [{email: req.body.email}, {username: req.body.username}] })
    if (user) {
        return res.status(401).json( {error: 'User already in use'});
    } else {
        return next()
    }
}
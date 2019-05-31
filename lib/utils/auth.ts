import * as jwt from 'jsonwebtoken';

export const generateToken = user => `JWT ${jwt.sign({
    id: user.id, email: user.email,
    iat: Math.floor(Date.now() / 1000) - 30,
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
}, 'secret_key')}`;
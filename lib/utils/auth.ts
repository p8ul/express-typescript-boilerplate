import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
import { Request, Response } from "express";
import { UserSchema } from "../models/user";

const User = mongoose.model("User", UserSchema);

export const generateToken = user =>
  !user
    ? null
    : `${jwt.sign(
        {
          id: user.id ? user.id : null,
          email: user.email,
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
        "secret_key"
      )}`;

const getToken = (req: Request) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.trim().length === 0
  ) {
    return null;
  }
  // expects authorization header to contain value such as `Bearer {token}`
  return req.headers.authorization.split(" ")[1];
};

const deriveError = (err) => {
    const message =
      err instanceof jwt.TokenExpiredError
        ? 'Your token has expired!'
        : 'Invalid token';
    return {
      status: 404,
      message,
    };
  };

const checkAuth = async (req: Request & { user: string }) => {
  const token = getToken(req);
  let error = null;
  try {
    if (token) {
      const userData = jwt.verify(token, 'secret_key');
      req.user = await User.findOne({ email: userData.email });
    } else {
      error = {
        status: 404,
        message: "Please provide a token"
      };
    }
  } catch (err) {
    error = deriveError(err);
  }
  return error;
};

/**
 * Authenticates a request by checking the authorization header. If successful,
 * it adds the user object to the request object and allows the request to
 * proceed. Else, it returns a 401 error with the appropriate message.
 *
 * @param req Request
 * @param res Response
 * @param next
 * @returns {Promise<*>}
 */
const authenticate = async (req: Request & { user: string }, res: Response, next) => {
  const error = await checkAuth(req);
  if (!error) {
    return next();
  }
  return res.status(401).json(error);
};

export default authenticate;

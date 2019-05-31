import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;
type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;


export const UserSchema = new Schema({
    username: {
        type: String,
        required: 'Enter a username'
    },
    email: {
        type: String,
        required: 'Enter a email',
    },
    password: {
        type: String,
        required: 'Enter a password',
    }
});

/**
 * Password hash middleware.
 */
UserSchema.pre("save", function save(next) {
    const user = this;
    
    if (!user.isModified("password")) { return next(); }
    
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, (err: mongoose.Error, hash) => {
        if (err) { 
            return next(err); 
        }
        user.password = hash;
        next();
        });
    });
});

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};
  
UserSchema.methods.comparePassword = comparePassword;
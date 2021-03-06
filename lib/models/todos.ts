import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TodoSchema = new Schema({
    title: {
        type: String,
        required: 'Enter a title'
    },
    note: {
        type: String,
        required: 'Enter a note',
    },
    status: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


TodoSchema.virtual('name').get(function () {
    return this._id + ' ' + this.title;
});
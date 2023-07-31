const { Schema, model } = require('mongoose');

const ReadingSchema = Schema({
    string: {
        type: String,
        required: [true, 'The string is required']
    },
    count: {
        type: Number,
        default: 1
    }
})

ReadingSchema.methods.toJSON = function () {
    const { __v, _id, ... data} = this.toObject();
    return data;
}
module.exports = model('Reading', ReadingSchema);
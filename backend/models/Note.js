const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'users'
    },

    description: {
        type: String,
        required: true,
    },

    tag: {
        type: String,
        required: true,
        default: 'General'
    },

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notes', noteSchema);
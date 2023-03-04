const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('userEmails', emailSchema);
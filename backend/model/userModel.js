const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
});

const UserModel = mongoose.model("userModel",UserSchema);

module.exports = UserModel;
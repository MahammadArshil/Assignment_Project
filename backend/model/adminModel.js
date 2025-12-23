const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    role: {type: String}
});

const AdminModel = mongoose.model("adminModel",AdminSchema);

module.exports = AdminModel;
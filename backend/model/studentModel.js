const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    role: {type: String},
    course: {type: String},
    enrollmentDate: {type: Date},
});

const StudentModel = mongoose.model("studentModel",StudentSchema);

module.exports = StudentModel;
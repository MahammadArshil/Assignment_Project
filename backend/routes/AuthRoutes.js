const { GenerateToken, HashedPassword, checkPassword } = require('../lib/auth');
const adminModel = require('../model/adminModel');
const studentModel = require('../model/studentModel');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (role == "admin") {
            const existingUser = await adminModel.find({
                email: email,
            });

            if (existingUser.length) {
                return res.status(400).send('Admin Already exists!');
            }

            const hashedPassword = await HashedPassword(password);
            const newAdmin = new adminModel({
                name: name,
                email: email,
                password: hashedPassword,
                role: role,
            });
            await newAdmin.save();
            return res.status(200).send("Admin Created Successfully.");
        }

        else if(role == "student") {
            const existingUser = await studentModel.find({
                email: email,
            });

            if (existingUser.length) {
                return res.status(400).send('Student Already exists!');
            }

            const hashedPassword = await HashedPassword(password);
            const newStudent = new studentModel({
                name: name,
                email: email,
                password: hashedPassword,
                role: role,
            });
            await newStudent.save();
            return res.status(200).send("Student Created Successfully.");
        }
    }
    catch (error) {
        res.status(500).send("Sign up Failed!");
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingAdmin = await adminModel.find({
            email: email,
        });

        if (!existingAdmin.length) {
            const existingStudent = await studentModel.find({
                email: email,
            });

            if (!existingStudent.length) {
                return res.status(400).send('User Does not exists!');
            }
            const user = existingStudent[0];
            const result = await checkPassword(password, user.password);

            if (!result) return res.status(401).send("Incorrect Password!");

            const token = GenerateToken({ email });
            res.send({ token: token , role: user.role , id: user._id});

            return res.status(400).send('User Does not exists!');
        }

        const user = existingAdmin[0];
        const result = await checkPassword(password, user.password);
        if (!result) return res.status(401).send("Incorrect Password!");

        const token = GenerateToken({ email });
        res.send({ token: token , role: user.role, name: user.name});

    }
    catch (error) {
        res.status(500).send("Login Failed!");
        console.log(error)
    }
});

module.exports = router;
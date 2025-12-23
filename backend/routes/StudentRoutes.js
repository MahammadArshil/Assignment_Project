const studentModel = require('../model/studentModel');
const router = require('express').Router();
const { HashedPassword } = require('../lib/auth');


router.get('/', async (req, res) => {
    const student_data = await studentModel.find({});
    res.send(student_data);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const student_data = await studentModel.findById(id);
    res.send(student_data);
});

router.post('/add', async (req, res) => {
    try {
        const body = req.body;
        // console.log(body);
        const name = body.name;
        const email = body.email;
        const password = body.password;
        const course = body.course;
        const enrollmentDate = body.enrollmentDate;
        const role = body.role;
        // const role = "student";

        const hashedPassword = await HashedPassword(password);

        const newData = new studentModel({
            name: name,
            email: email,
            password: hashedPassword,
            course: course,
            role: role,
            enrollmentDate: enrollmentDate
        });

        const result = await newData.save();

        return res.status(200).send(result);
    }
    catch (error) {
        console.log(`Error in Adding Data: ${error}`);
        return res.status(500).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await studentModel.findByIdAndDelete(id);
        console.log("result:", result);
        if (!result) {
            return res.status(404).send("Data not Found.");
        }
        return res.status(200).send("Data Deleted..");
    }
    catch (error) {
        console.log(`Error in Deleting Data: ${error}`);
        return res.status(500).send(err);
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const name = body.name;
        const email = body.email;
        const course = body.course;
        const enrollmentDate = body.enrollmentDate;
        // const experience = body.experience;
        const updateData = await studentModel.findByIdAndUpdate(id, { name: name, email: email, course: course, enrollmentDate: enrollmentDate });
        const result = await updateData.save();
        return res.status(200).send(result);
    }
    catch (error) {
        console.log(`Error in Editing Data: ${error}`);
        return res.status(500).send(err);
    }
});

module.exports = router;
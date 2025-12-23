import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const AddStudent = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');
    const [password, setPassword] = useState('');
    const [enrollmentDate, setEnrollmentDate] = useState('');

    const handleEditData = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5050/add', { name: name, email: email, password: password, course: course, enrollmentDate: enrollmentDate, role:"student" })
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Data Added Successfully.");
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log("Error:", err);
                toast.error("Data can't Add.");
            })
    }

    return (
        <div className='flex justify-center items-center w-full h-full'>
            <form className='p-5 border-2 border-black rounded-xl shadow-xl shadow-cyan-500/50' onSubmit={handleEditData}>
                <h1 className='w-full flex justify-center items-center text-2xl font-semibold text-blue-800'>Add Student</h1>
                <hr className='mt-3 w-full bg-black h-1' />
                <div className='flex justify-between items-center mb-3 mt-10'>
                    <label className='text-lg font-semibold mr-5'>Name</label>
                    <input value={name} onChange={(e) => { setName(e.target.value) }}
                        type="text" placeholder='John Doe' required
                        className='border border-cyan-700 rounded p-1 outline-none' />
                </div>
                <div className='flex justify-between items-center mb-3'>
                    <label className='text-lg font-semibold mr-5'>Email</label>
                    <input value={email} onChange={(e) => { setEmail(e.target.value) }}
                        type="text" placeholder='example@gmail.com' required
                        className='border border-cyan-700 rounded p-1 outline-none' />
                </div>
                <div className='flex justify-between items-center mb-3'>
                    <label className='text-lg font-semibold mr-5'>Password</label>
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }}
                        type="password" placeholder='********' required
                        className='border border-cyan-700 rounded p-1 outline-none' />
                </div>
                <div className='flex justify-between items-center mb-3'>
                    <label className='text-lg font-semibold mr-5'>Course</label>
                    <input value={course} onChange={(e) => { setCourse(e.target.value) }}
                        type="text" placeholder='MERN Bootcamp' required
                        className='border border-cyan-700 rounded p-1 outline-none' />
                </div>
                <div className='flex justify-between items-center mb-3'>
                    <label className='text-lg font-semibold mr-5'>Enrollment Date</label>
                    <input value={enrollmentDate} onChange={(e) => { setEnrollmentDate(e.target.value) }}
                        type="Date" required
                        className='border border-cyan-700 rounded p-1 outline-none' />
                </div>
                <div className='flex justify-center items-center mt-10'>
                    <button type='submit'
                        className='w-full rounded-xl text-white font-semibold text-xl py-2 bg-blue-700 po'>Add Student</button>
                </div>
            </form>
        </div>
    );
}

export default AddStudent;

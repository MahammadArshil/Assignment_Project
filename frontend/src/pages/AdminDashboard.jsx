import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const AdminDashboard = ({ name }) => {
    const navigate = useNavigate();

    const [data, setData] = useState(
        [{
            name: "",
            email: "",
            course: "",
            enrollmentDate: ""
        }]);

    const getData = () => {
        axios
            .get("http://localhost:5050/").then(
                async (res) => {
                    setData(res.data);
                });
    }

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5050/${id}`)
            .then((res) => {
                getData();
                toast.success("Data Deleted.",res);
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
                toast.error("Data Deleted.");
            })
    }

    function onlogout(e) {
        e.preventDefault();
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div>
            <div className='flex justify-between items-center mx-8 my-3'>
                <h2 className='text-blue-600 font-bold text-2xl'>Hello {name}</h2>
                <div className='flex gap-10'>
                    <Link to={'/add'}><button className='bg-green-800 p-2 text-white font-semibold border rounded-md'
                    >Add Student</button></Link>
                    <button className='bg-red-800 p-2 text-white font-semibold border rounded-md'
                        onClick={onlogout} >Logout</button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1 className='p-4 mb-3 text-3xl font-bold'>Student Details</h1>
                <div className="text-lg">
                    <table className='border-2 border-blue-600 rounded-lg px-3 py-2'>
                        <tr className='border-2 border-blue-600 rounded-lg'>
                            <th className='border-2 border-blue-600 text-lg px-3 py-2'>Name</th>
                            <th className='border-2 border-blue-600 text-lg px-3 py-2'>Email</th>
                            <th className='border-2 border-blue-600 text-lg px-3 py-2'>Course</th>
                            <th className='border-2 border-blue-600 text-lg px-3 py-2'>Enrollment Date</th>
                            <th className='border-2 border-blue-600 text-lg px-3 py-2'>Action</th>
                        </tr>
                        {
                            data.map((item) => {
                                return (
                                    <tr key={item._id} className='border-2 border-blue-600 rounded-lg'>
                                        <td className='border-2 border-blue-600 text-lg px-3 py-2'>{item.name}</td>
                                        <td className='border-2 border-blue-600 text-lg px-3 py-2'>{item.email}</td>
                                        <td className='border-2 border-blue-600 text-lg px-3 py-2'>{item.course}</td>
                                        <td className='border-2 border-blue-600 text-lg px-3 py-2'>{item.enrollmentDate}</td>
                                        <td className='text-lg px-3 py-2 justify-evenly flex items-center'>
                                            <Link to={'/edit'} state={item}><button className="text-blue-700 hover:text-blue-900"><FaEdit /></button></Link>
                                            <button onClick={() => handleDelete(item._id)}
                                                className="text-red-700 hover:text-red-900"><FaTrash /></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;

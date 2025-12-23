import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';


const StudentDashboard = ({ id }) => {
    const navigate = useNavigate();
    const [data, setData] = useState(
        [{
            name: "",
            email: "",
            course: "",
            enrollmentDate: ""
        }]);

    useEffect(() => {
        getData();
    },[]);

    const getData = () => {
        axios
            .get(`http://localhost:5050/${id}`).then(
                async (res) => {
                    setData(res.data);
                });
    }

    function onlogout(e) {
        e.preventDefault();
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div>
            <div className='flex justify-between items-center mx-8 my-3'>
                <h2 className='text-blue-600 font-bold text-2xl'>Hello {data.name}</h2>
                <div className='flex gap-10'>
                    <Link to={'/edit'} state={data}><button className='bg-green-800 p-2 text-white font-semibold border rounded-md'
                    >Edit Details</button></Link>
                    <button className='bg-red-800 p-2 text-white font-semibold border rounded-md'
                        onClick={onlogout} >Logout</button>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='p-4 mb-3 text-3xl font-bold'>My Details</h1>
                <table className='border-2 border-blue-600 rounded-lg px-3 py-2'>
                    <tr className='border-2 border-blue-600 rounded-lg'>
                        <th className='border-2 border-blue-600 text-lg px-3 py-2'>Name</th>
                        <th className='border-2 border-blue-600 text-lg px-3 py-2'>Email</th>
                        <th className='border-2 border-blue-600 text-lg px-3 py-2'>Course</th>
                        <th className='border-2 border-blue-600 text-lg px-3 py-2'>Enrollment Date</th>
                    </tr>
                    <tr className='border-2 border-blue-600 rounded-lg'>
                        <td className='border-2 border-blue-600 text-lg px-3 py-2'>{data.name}</td>
                        <td className='border-2 border-blue-600 text-lg px-3 py-2'>{data.email}</td>
                        <td className='border-2 border-blue-600 text-lg px-3 py-2'>{data.course}</td>
                        <td className='border-2 border-blue-600 text-lg px-3 py-2'>{data.enrollmentDate}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default StudentDashboard;

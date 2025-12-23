import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5050/login", { email, password })
      .then((res) => {
        if (res.status == 200 && res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role",res.data.role);
          localStorage.setItem("id",res.data.id);
          localStorage.setItem("name",res.data.name);
          navigate('/');
        }
      });
  }

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <form className='p-5 border-2 border-black rounded-xl shadow-xl shadow-cyan-500/50' onSubmit={onSubmit}>
        <h1 className='w-full flex justify-center items-center text-2xl font-semibold text-blue-800'>Login</h1>
        <hr className='mt-3 w-full bg-black h-1' />
        <div className='flex justify-between items-center mb-3 mt-10'>
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
        <div className='flex justify-center items-center mt-10'>
          <button className='w-full rounded-xl text-white font-semibold text-xl py-2 bg-blue-700 po'>Login</button>
        </div>
        <div className='flex justify-center items-center mt-3'>
          <span>Don't have an account? <Link to={"/signup"} className='text-blue-600 underline'>SignUp</Link></span>
        </div>
      </form>
    </div>
  );
}

export default Login;

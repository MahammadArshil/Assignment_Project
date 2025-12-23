import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {

  });

  function onlogout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className='flex flex-col justify-center items-center gap-5 w-full h-full text-3xl font-bold'>
      Home Page
      <button className='bg-red-800 p-2 text-white font-semibold border rounded-md'
        onClick={onlogout} >Logout</button>
    </div>
  );
}

export default Home;

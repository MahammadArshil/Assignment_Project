import { Route, Routes } from 'react-router'
import './App.css'
// import axios from 'axios';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PrivateRoutes from './components/PrivateRoutes'
import AdminDashboard from './pages/AdminDashboard'
import StudentDashboard from './pages/StudentDashboard'
import EditStudent from './components/EditStudent'
import AddStudent from './components/AddStudent'

function App() {

  const name = localStorage.getItem("name");
  const id = localStorage.getItem("id");

  const role = localStorage.getItem("role");

  return (
    <div className='h-screen'>
      <Routes>
        <Route path='/' element={<PrivateRoutes>
          {role == 'admin' ? <AdminDashboard name={name} /> : <StudentDashboard id={id} />}
        </PrivateRoutes>} />
        <Route path='/edit' element={<EditStudent />} />
        <Route path='/add' element={<AddStudent />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App

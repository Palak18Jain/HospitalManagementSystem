import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard';
import AllApoinments from './pages/Admin/AllApoinments';
import AddDoctors from './pages/Admin/AddDoctors';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import DoctorAppoinment from './pages/Doctor/DoctorAppoinment';

function App() {


  const { aToken } = useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)



  return aToken || dToken ? (
    <div  className ='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar/>
      <div className='flex items-start w-full min-h-[calc(100vh-68px)] bg-slate-50/50'>
        <Sidebar />
        <div className='flex-1 w-full overflow-x-hidden'>
          <Routes>
            {/* Admin Routes */}
            {aToken && <Route path='/' element={<Dashboard />} />}
            {aToken && <Route path='/admin-dashboard' element={<Dashboard />} />}
            {aToken && <Route path='/all-appoinments' element={<AllApoinments />} />}
            {aToken && <Route path='/add-doctor' element={<AddDoctors />} />}
            {aToken && <Route path='/doctor-list' element={<DoctorsList />} />}

            {/* Doctor Routes */}
            {dToken && <Route path='/' element={<DoctorDashboard />} />}
            {dToken && <Route path='/doctor-dashboard' element={<DoctorDashboard />} />}
            {dToken && <Route path='/doctor-profile' element={<DoctorProfile />} />}
            {dToken && <Route path='/doctor-appoinments' element={<DoctorAppoinment />} />}
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )


}

export default App;

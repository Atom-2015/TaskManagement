




import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// import ankit from '../Media/thumb-1920-665825.jpg';
import { LiaCompressArrowsAltSolid } from "react-icons/lia";
 
import './sidebar.css';
import { useSelector, useDispatch } from 'react-redux';
import { Gauge, Briefcase, Users, Settings, CalendarDays,TowerControl,AudioWaveform  } from 'lucide-react';
import { BiTask } from "react-icons/bi";
import Header from './header';

function Sidebar() {
    // const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const response = useSelector((state) => state.user);
    const [user, setUser] = useState({
        name: '',
        company: 'The Smart Inspection',
    });

    const openmodal = async () => {
        // setModalOpen(true);
        // const data = await dispatch(getUserName());
        // console.warn('ye data hai direct dispatch se', data.payload.name);
        // setUser(data.payload);
    };

    const handleLogout = () => {
        localStorage.clear('token');
        navigate('/signin');
    };
    const [permission , setPermission] = useState(false)
    useEffect(()=>{
        if(localStorage.getItem('kijiethPanday') === "jdkfj"){
            setPermission(true);
        }
    },[])
    return (
        <div style={{ height: '100vh', display: 'flex', position:  'relative',background:'#1f2937', width: '100%' }}>
            {/* Background with blur */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                
                width: '100%',
                height: '100vh',
               
              
                zIndex: '-1',
            }}></div>

            {/* Header Section */}
            <div >
                {/* Left Side: Circle Image and Notification Bell */}
                <Header/>
            </div>

            {/* Sidebar */}
            <div style={{
                width: 'auto',
                position: 'fixed',
                top: '0px',
                marginTop:'30px',
                height: '100vh',
                background: '#1f2937',
                backdropFilter: 'blur(10px)',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0px 0px 8px 0px gray',
                padding: '20px',
                alignItems: 'center',
                zIndex: '1',
            }} id='sidebarmobile'>
                {/* User Icon */}
                <div
                    className="mb-5 mt-3 relative group"
                    onClick={() => openmodal()}
                    style={{ cursor: 'pointer', position: 'relative' }}
                >
                    <span className="absolute left-full cursor-pointer ml-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded p-2 py-1 px-4 z-10">User</span>
                </div>

                {/* Sidebar Links */}
                <div>
                    {/* Main Link */}
                    <div className="mb-4 relative group">
                        <NavLink
                            to='/dashboard' id='clicksidebar'
                            className={({ isActive }) =>
                                ` py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600"}`}
                        >
                            <Gauge size={20} />
                            <span>Dashboard</span>
                        </NavLink>
                    </div>
                        
                        {/*TaskDashboard*/}
                    <div className="mb-4 relative group">
                        <NavLink
                            to='/taskDashboard' id='clicksidebar'
                            className={({ isActive }) =>
                                ` py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600"}`}
                        >
                            <BiTask size={20} />
                            <span>Task</span>
                        </NavLink>
                    </div>

                    {/* Dashboard Link */}
                    <div className="mb-4 relative group">
                        <NavLink
                            to='/projectManagement'
                            className={({ isActive }) =>
                                ` py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600"}`}
                        >
                            <Briefcase size={20} />
                            <span>Projects</span>
                        </NavLink>
                    </div>

                    {/* Management Link */}
                    {permission?(<div className="mb-4 relative group">
                        <NavLink
                            to='/userManagement'
                            className={({ isActive }) =>
                                `py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600"}`}>
                            <Users size={20} />
                            <span>Users</span>
                        </NavLink>
                    </div>):""}

                    {/* leaves */}
                    {permission?(<div className="mb-4 relative group">
                        <NavLink
                            to='/leaves' id='clicksidebar'
                            className={({ isActive }) =>
                                ` py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600"}`}
                        >
                            <AudioWaveform size={20} />
                            <span>Leaves</span>
                        </NavLink>
                    </div>):""}

                    {/* Payroll */}
                    {permission?(
                        <div className="mb-4 relative group">
                        <NavLink
                            to='/Payroll' id='clicksidebar'
                            className={({ isActive }) =>
                                ` py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600"}`}
                        >
                            <TowerControl size={20} />
                            <span>Payroll</span>
                        </NavLink>
                    </div>
                    ):""}

                    {/* Billing Link */}
                   {permission ? (
                     <div className="mb-4 relative group">
                     <NavLink
                         to='/settings'
                         className={({ isActive }) =>
                             `py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600"}`}
                     >
                         <Settings size={20} />
                         <span>Settings</span>
                     </NavLink>
                 </div>
                   ):""}
                    {/*Company link*/}
                    {permission ? (
                        <div className="mb-4 relative group">
                        <NavLink
                            to='/Company'
                            className={({ isActive }) =>
                                `py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600"}`}
                        >
                            <LiaCompressArrowsAltSolid  size={20} />
                            <span>Company</span>
                        </NavLink>
                    </div>
                    ):""}

                    {permission?(
                        <div className="mb-4 relative group">
                        <NavLink
                            to='/attendance'
                            className={({ isActive }) =>
                                `py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-600"}`}
                        >
                            <CalendarDays size={20} />
                            <span>Attendance</span>
                        </NavLink>
                    </div>
                    ):""}
                </div>
            </div>

            {/* Content Area */}
            <div className="p-[9px] mt-[70px] box-border" id='sidebar-right' style={{
                width: '88%',
                marginLeft: '200px',
                overflowY: 'scroll',
            
                background:'#2e3e4e',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                zIndex: '0'
            }}>
                <Outlet />
            </div>

            {/* Background Overlay for Modal */}
            

            {/* Modal in the Center */}
             
        </div>
    );
}

export default Sidebar;

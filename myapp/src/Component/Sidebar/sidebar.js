
// import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faUserTie, faMapLocationDot, faChartColumn, faListCheck, faMoneyBill1, faHandshakeAngle } from '@fortawesome/free-solid-svg-icons';
// import React, { useState } from 'react';
// import ankit from '../Media/thumb-1920-665825.jpg';
// import { getUserName } from '../../FeatureRedux/User_Name'
// import './sidebar.css'
// import { useSelector, useDispatch } from 'react-redux';
// import { Home, Briefcase, Calendar, Settings } from 'lucide-react'



// function Sidebar() {
//     const [isModalOpen, setModalOpen] = useState(false);




//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const response = useSelector((state) => state.user);
//     const [user, setUser] = useState({
//         name: '',
//         company: 'The Smart Inspection',
//     });

   


//     const openmodal = async () => {
//         setModalOpen(true);
//         const data = await dispatch(getUserName());
//         console.warn('ye data hai direct dispatch se', data.payload.name);
//         setUser(data.payload)
//     }

//     const handleLogout = () => {
//         localStorage.clear('token');
//         navigate('/signin')
//     };

//     return (
//         <div style={{ height: '100vh', display: 'flex', position: 'relative', width: '100%' }}>
//             {/* Background with blur */}
//             <div style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: '100vh',
//                 backgroundImage: `url(${ankit})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 filter: 'blur(1px)',
//                 zIndex: '-1',
//             }}></div>

//             {/* Sidebar */}
//             <div  style={{
//                 width: '13%',
//                 position: 'fixed',
//                 top: '0px',
//                 height: '100vh',
//                 background: '#1f2937',
//                 backdropFilter: 'blur(10px)',
                
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 boxShadow: '0px 0px 8px 0px gray',
//                 padding: '20px',
//                 alignItems: 'center',
//                 zIndex: '1',
//             }} id='sidebarmobile'>
//                 {/* User Icon */}
//                 <div
//                     className="mb-5 mt-3 relative group"
//                     onClick={() => openmodal()}
//                     style={{ cursor: 'pointer', position: 'relative' }}
//                 >
//                     {/* <FontAwesomeIcon icon={faUserTie} className='text-white text-xl' /> */}
//                     <span className="absolute left-full cursor-pointer  ml-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded p-2 py-1 px-4 z-10">User</span>
//                 </div>

//                 {/* Sidebar Links */}
//                 <div>
//                     {/* Main Link */}
//                     <div className="mb-4 relative group">
//                         <NavLink
//                             to='/dashboard' id='clicksidebar'
//                             className={({ isActive }) =>
//                                 ` py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-800"}`
//                             }
//                         >
//                             {/* <FontAwesomeIcon icon={faMapLocationDot} className='text-white' /> */}
//                             <Home size={20} />
//                             <span>Dashboard</span>
//                         </NavLink>
//                         {/* <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded p-2 py-1 px-4 z-10">Dashboard


//                         </span> */}
//                     </div>

//                     {/* Dashboard Link */}
//                     <div className="mb-4 relative group">
//                         <NavLink
//                             to='/projectManagement'
//                             className={({ isActive }) =>
//                                 ` py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-800"}`
//                             }
//                         >
//                             {/* <FontAwesomeIcon icon={faChartColumn} className='text-white' /> */}
//                             <Briefcase size={20} />
//                             <span>Projects</span>
//                         </NavLink>
//                         {/* <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded p-2 py-1 px-4 z-10">PM</span> */}
//                     </div>

//                     {/* Management Link */}
//                     <div className="mb-4 relative group">
//                         <NavLink
//                             to='/userManagement'
//                             className={({ isActive }) =>
//                                 `py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-800"}`
//                             }
//                         >
//                             {/* <FontAwesomeIcon icon={faListCheck} className=" text-white" /> */}
//                             <Calendar size={20} />
//                             <span>Leave</span>
//                         </NavLink>
//                         {/* <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded p-2 py-1 px-4 z-10">User Management</span> */}
//                     </div>

//                     {/* Billing Link */}
//                     <div className="mb-4 relative group">
//                         <NavLink
//                             to='/billing'
//                             className={({ isActive }) =>
//                                 `py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-800"}`
//                             }
//                         >
//                             {/* <FontAwesomeIcon icon={faMoneyBill1} className=" text-white" /> */}
//                             <Settings size={20} />
//                             <span>Settings</span>
//                         </NavLink>
//                         {/* <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded p-2 py-1 px-4 z-10">Billing</span> */}
//                     </div>
//                 </div>

            


//             </div>

//             {/* Content Area */}
//             <div className="p-[9px] box-border  " id='sidebar-right' style={{
//                 width: '100%',
//                 marginLeft: '200px',
                
//                 // height: '100vh',
//                 overflowY: 'scroll',
//                 background: '#EBEAE5',
//                 // background: 'red',
//                 backdropFilter: 'blur(10px)',
//                 boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//                 zIndex: '0'
//             }} >
//                 <Outlet />
//             </div>

//             {/* Background Overlay for Modal */}
//             {isModalOpen && (
//                 <div style={{
//                     position: 'fixed',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100%',
//                     backgroundColor: 'rgba(0, 0, 0, 0.9)', // Semi-transparent dark overlay
//                     zIndex: 1000,
//                 }}></div>
//             )}

//             {/* Modal in the Center */}
//             {isModalOpen && (
//                 <div style={{
//                     position: 'fixed',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     background: '#fff',
//                     borderRadius: '8px',
//                     boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
//                     padding: '20px',
//                     zIndex: 2001,
//                     width: '300px',
//                 }}>
//                     <div style={{ textAlign: 'center', marginBottom: '15px' }}>
//                         <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#333' }}>Welcome, {user.name}</h3>
//                         <p style={{ margin: 0, fontSize: '14px', color: '#777' }}>{user.company || 'No company'}</p>
//                     </div>
//                     <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px' }}>
//                         <button
//                             style={{
//                                 width: '100%',
//                                 background: '#007BFF',
//                                 color: '#fff',
//                                 border: 'none',
//                                 borderRadius: '4px',
//                                 padding: '10px',
//                                 cursor: 'pointer',
//                                 marginBottom: '10px',
//                                 fontSize: '14px',
//                                 fontWeight: 'bold',
//                             }}
//                             onClick={handleLogout}
//                         >
//                             Logout
//                         </button>
//                         <button
//                             style={{
//                                 width: '100%',
//                                 background: '#6c757d',
//                                 color: '#fff',
//                                 border: 'none',
//                                 borderRadius: '4px',
//                                 padding: '10px',
//                                 cursor: 'pointer',
//                                 fontSize: '14px',
//                                 fontWeight: 'bold',
//                             }}
//                             onClick={() => setModalOpen(false)}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Sidebar;




import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import ankit from '../Media/thumb-1920-665825.jpg';

import { getUserName } from '../../FeatureRedux/User_Name';
import './sidebar.css';
import { useSelector, useDispatch } from 'react-redux';
import { Home, Briefcase, Calendar, Settings } from 'lucide-react';
import Header from './header';

function Sidebar() {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const response = useSelector((state) => state.user);
    const [user, setUser] = useState({
        name: '',
        company: 'The Smart Inspection',
    });

    const openmodal = async () => {
        setModalOpen(true);
        const data = await dispatch(getUserName());
        console.warn('ye data hai direct dispatch se', data.payload.name);
        setUser(data.payload);
    };

    const handleLogout = () => {
        localStorage.clear('token');
        navigate('/signin');
    };

    return (
        <div style={{ height: '100vh', display: 'flex', position: 'relative', width: '100%' }}>
            {/* Background with blur */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundImage: `url(${ankit})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(1px)',
                zIndex: '-1',
            }}></div>

            {/* Header Section */}
            <div >
                {/* Left Side: Circle Image and Notification Bell */}
                <Header/>
            </div>

            {/* Sidebar */}
            <div style={{
                width: '13%',
                position: 'fixed',
                top: '0px',
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
                                ` py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-800"}`}
                        >
                            <Home size={20} />
                            <span>Dashboard</span>
                        </NavLink>
                    </div>

                    {/* Dashboard Link */}
                    <div className="mb-4 relative group">
                        <NavLink
                            to='/projectManagement'
                            className={({ isActive }) =>
                                ` py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-800"}`}
                        >
                            <Briefcase size={20} />
                            <span>Projects</span>
                        </NavLink>
                    </div>

                    {/* Management Link */}
                    <div className="mb-4 relative group">
                        <NavLink
                            to='/userManagement'
                            className={({ isActive }) =>
                                `py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-800"}`}>
                            <Calendar size={20} />
                            <span>Leave</span>
                        </NavLink>
                    </div>

                    {/* Billing Link */}
                    <div className="mb-4 relative group">
                        <NavLink
                            to='/settings'
                            className={({ isActive }) =>
                                `py-2 px-4 rounded-lg flex align-middle items-center gap-[10px] no-underline ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-800"}`}
                        >
                            <Settings size={20} />
                            <span>Settings</span>
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-[9px] box-border" id='sidebar-right' style={{
                width: '100%',
                marginLeft: '200px',
                overflowY: 'scroll',
                background: '#EBEAE5',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                zIndex: '0'
            }}>
                <Outlet />
            </div>

            {/* Background Overlay for Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                    zIndex: 1000,
                }}></div>
            )}

            {/* Modal in the Center */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    padding: '20px',
                    zIndex: 2001,
                    width: '300px',
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#333' }}>Welcome, {user.name}</h3>
                        <p style={{ margin: 0, fontSize: '14px', color: '#777' }}>{user.company || 'No company'}</p>
                    </div>
                    <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px' }}>
                        <button
                            style={{
                                width: '100%',
                                background: '#007BFF',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '10px',
                                cursor: 'pointer',
                                marginBottom: '10px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                            }}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                        <button
                            style={{
                                width: '100%',
                                background: '#6c757d',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '10px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold',
                            }}
                            onClick={() => setModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;

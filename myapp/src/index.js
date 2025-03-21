// import React, { useState, useEffect } from 'react'; 
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import { createBrowserRouter, RouterProvider, Route, useNavigate , useLocation} from 'react-router-dom';
 
// import Sign_up from './Component/Authfolder/signup';
// import Sign_in from './Component/Authfolder/signin';
// import App from './App';
// import { Provider } from "react-redux";
// import { store } from './StoreRDK/store'; 
// import ProjectIndex from './Component/Projects/projectIndex';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import UsermanagementIndex from './Component/userManagement.js/usermanagementIndex';
// import Taskmanagement from './Component/Taskmanagement/taskmanagement';
// import Dashboardindex from './Component/Dashboard/dashboardindex';
// import Settingindex from './Component/Settings/settingindex';
// import ProjectSetting from './Component/Settings/NestedComponentSettings/projectSetting';
// import Taskindex from './Component/Taskmanagement/taskindex';
// import Projectdetal from './Component/Taskmanagement/projectdetailpageintask/projectdetal';
// import Attendanceindex from './Component/Attendance/attendanceindex';
 
 
 

// const ProtectedRoute = ({ element }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();



//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem('token');

//       if (token) {
//         setLoading(true);
//         setIsAuthenticated(true);
//         setLoading(false);
//       } else {
//         setLoading(false);
//         setIsAuthenticated(false);
//         navigate('/signin'); // Navigate to signin page
//       }
//     };

//     checkAuth();
//   }, [navigate]);

//   if (loading) {
//     return <div>Loading...</div>;  
//   }

//   return isAuthenticated ? element : null;
// };

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <ProtectedRoute element={<App />} />,
//     children:[
//       {path:'/dashboard' , element : <Dashboardindex/>},
//       {path:'/projectManagement' , element : <ProjectIndex/>},
//       {path:'/userManagement' , element:<UsermanagementIndex/>},
//       {path:'/tasks' , element :  <Taskindex/> , children:[
//         {path:'/tasks/alltask' , element:<Taskmanagement/>},
//         {path:'/tasks/projectdetails' , element:<Projectdetal/>},
//       ] },
//       {path:'/settings' , element: <Settingindex/> , children:[
//         {path:'/settings/prijectSetting' , element : <ProjectSetting/> },
//       ]},
//       {path:'/attendance',element:<Attendanceindex/>}
      
//     ]
     
//   },

 
//   { path: '/signin', element: <Sign_in /> },
//   { path: '/signup', element: <Sign_up /> },
// ]);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     {/* <Provider store={store}> */}
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   </React.StrictMode>
// );



import React, { useState, useEffect } from 'react'; 
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Route, useNavigate } from 'react-router-dom';

import Sign_up from './Component/Authfolder/signup';
import Sign_in from './Component/Authfolder/signin';
import App from './App';
import { Provider } from "react-redux";
import { store } from './StoreRDK/store'; 
import ProjectIndex from './Component/Projects/projectIndex';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import UsermanagementIndex from './Component/userManagement.js/usermanagementIndex';
import Taskmanagement from './Component/Taskmanagement/taskmanagement';
import Dashboardindex from './Component/Dashboard/dashboardindex';
import Settingindex from './Component/Settings/settingindex';
import ProjectSetting from './Component/Settings/NestedComponentSettings/projectSetting';
import Taskindex from './Component/Taskmanagement/taskindex';
import Projectdetal from './Component/Taskmanagement/projectdetailpageintask/projectdetal';
import Attendanceindex from './Component/Attendance/attendanceindex';
import TaskDashboard from './Component/Dashboard/componentDashboard/TaskDashboard';
import Test from './Component/test';
import ProjectViewList from './Component/Projects/ProjectViewList';
import ProjectCost from './Component/Taskmanagement/projectcost/projectcost';

// ProtectedRoute Component
const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');  // Check if token exists

      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/signin'); // Navigate to signin page if not authenticated
      }
      setLoading(false); // Set loading to false after the auth check
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading while checking auth
  }

  return isAuthenticated ? element : null;  // Render element if authenticated, else show null (redirect happens)
};

// Router Setup
const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute element={<App />} />,
    children: [
      { path: '/dashboard', element: <Dashboardindex /> },
      { path: '/projectManagement', element: <ProjectIndex /> },
      { path:'/project/:id', element:<ProjectViewList/>},
      { path: '/userManagement', element: <UsermanagementIndex /> },
      {
        path: '/tasks',
        element: <Taskindex />,
        children: [
          { path: '/tasks/alltask', element: <Taskmanagement /> },
          { path: '/tasks/projectdetails', element: <Projectdetal /> },
          { path: '/tasks/projectcost', element: <ProjectCost/> },
        ],
      },
      {
        path:'/taskDashboard',
        element: <TaskDashboard/>
      },
      {
        path: '/settings',
        element: <Settingindex />,
        children: [
          { path: '/settings/prijectSetting', element: <ProjectSetting /> },
        ],
      },
      { path: '/attendance', element: <Attendanceindex /> },
      {path:'/test' ,element:<Test/> },

     
    ],
  },
  { path: '/signin', element: <Sign_in /> },
  { path: '/signup', element: <Sign_up /> },
  
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

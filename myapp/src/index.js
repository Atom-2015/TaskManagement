import React, { useState, useEffect } from 'react'; 
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Route, useNavigate , useLocation} from 'react-router-dom';
 
import Sign_up from './Component/Authfolder/signup';
import Sign_in from './Component/Authfolder/signin';
import App from './App';
import { Provider } from "react-redux";
import { store } from './StoreRDK/store'; 
import ProjectIndex from './Component/Projects/projectIndex';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import UsermanagementIndex from './Component/userManagement.js/usermanagementIndex';
import Taskmanagement from './Component/Taskmanagement/taskmanagement';
import Dashboardindex from './Component/Dashboard/dashboardindex';
 
 

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        setLoading(true);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setLoading(false);
        setIsAuthenticated(false);
        navigate('/signin'); // Navigate to signin page
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;  
  }

  return isAuthenticated ? element : null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute element={<App />} />,
    children:[
      {path:'/dashboard' , element : <Dashboardindex/>},
      {path:'/projectManagement' , element : <ProjectIndex/>},
      {path:'/userManagement' , element:<UsermanagementIndex/>},
      {path:'/tasks' , element :  <Taskmanagement/> },
    ]
     
  },
  
  { path: '/signin', element: <Sign_in /> },
  { path: '/signup', element: <Sign_up /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

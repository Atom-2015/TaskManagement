

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  useNavigate,
} from "react-router-dom";

import Sign_up from "./Component/Authfolder/signup";
import Sign_in from "./Component/Authfolder/signin";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./StoreRDK/store";
import ProjectIndex from "./Component/Projects/projectIndex";
import "bootstrap/dist/css/bootstrap.min.css";
import UsermanagementIndex from "./Component/userManagement.js/usermanagementIndex";
import Taskmanagement from "./Component/Taskmanagement/taskmanagement";
import Dashboardindex from "./Component/Dashboard/dashboardindex";
import Settingindex from "./Component/Settings/settingindex";
import ProjectSetting from "./Component/Settings/NestedComponentSettings/projectSetting";
import Taskindex from "./Component/Taskmanagement/taskindex";
import Projectdetal from "./Component/Taskmanagement/projectdetailpageintask/projectdetal";
import Attendanceindex from "./Component/Attendance/attendanceindex";
import TaskDashboard from "./Component/Dashboard/componentDashboard/TaskDashboard";
import Test from "./Component/test";
import ProjectViewList from "./Component/Projects/ProjectViewList";
import ProjectCost from "./Component/Taskmanagement/projectcost/projectcost";
import AddTaskForm from "./Component/Projects/AddTaskForm";
import ProjectViewSubTask from "./Component/Projects/ProjectViewSubTask";
import ProjectViewSubTaskDetails from "./Component/Projects/ProjectViewSubTaskDetails";
import Company from "./Component/Company/Company";
import AddTaskForm1 from "./Component/Projects/AddTaskForm1";
import Budget from "./Component/Projects/ProjectBudget/Budget";
import LeaveDashboard from "./Component/LeaveComponent/LeaveDashboard";
import PayrollDashboard from "./Component/PayRoll/PayrollDashboard";
import LeaveMain from "./Component/LeaveComponent/LeaveManagement/LeaveMain";
import Leavemyteam from "./Component/LeaveComponent/LeaveManagement/Leavemyteam";
import HolidayDashBoard from "./Component/Holiday/HolidayDashBoard";
import UserAttendence from "./Component/Attendance/UserAttendence";
import CompanyAttendence from "./Component/Attendance/CompanyAttendence";

// ProtectedRoute Component
const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token"); // Check if token exists

      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/signin"); // Navigate to signin page if not authenticated
      }
      setLoading(false); // Set loading to false after the auth check
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking auth
  }

  return isAuthenticated ? element : null; // Render element if authenticated, else show null (redirect happens)
};

// Router Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<App />} />,
    children: [
      { path: "/dashboard", element: <Dashboardindex /> },
      { path: "/projectManagement", element: <ProjectIndex /> },
      { path: "/project/:id", element: <ProjectViewList /> },
      { path: "/project/:id/Budget", element: <Budget /> },
      { path: "/project/:id/add-task", element: <AddTaskForm1 /> },
      { path: "/userManagement", element: <UsermanagementIndex /> },
      {
        path: "/project/:id/task/:taskId",
        element: <ProjectViewSubTask isStandalone={true} />,
      },
      // {path:"/project/:id/subtask/:taskId/subtaskwithin/View",  element:<ProjectViewSubTaskDetails/>},
      // { path:"/project/:id/subtask/:taskId/subtaskwithin/:subtaskName/View", element:<ProjectViewSubTaskDetails />} ,
      // {path:"/project/${id}/subtask/${task.id}/subtaskwithin/${subtask.id}/View",element:<ProjectViewSubTaskDetails/>},
      {
        path: "/project/:id/task/:taskId/subtaskwithin/View",
        element: <ProjectViewSubTaskDetails />,
      },

      {
        path: "/tasks",
        element: <Taskindex />,
        children: [
          { path: "/tasks/alltask", element: <Taskmanagement /> },
          { path: "/tasks/projectdetails", element: <Projectdetal /> },
          { path: "/tasks/projectcost", element: <ProjectCost /> },
        ],
      },
      {
        path: "/taskDashboard",
        element: <TaskDashboard />,
      },
      {
        path: "/settings",
        element: <Settingindex />,
        children: [
          { path: "/settings/prijectSetting", element: <ProjectSetting /> },
        ],
      },

      {
        path: "/Payroll",
        element: <PayrollDashboard />,
      },

      {
        path: "/leaves",
        element: <LeaveMain />,
        children: [
          { path: "/leaves/myleave", element: <LeaveDashboard /> },
          { path: "/leaves/Myteamleave", element: <Leavemyteam /> },
        ],
      },

      { path: "/attendance", element: <Attendanceindex />,
        children:[
          {path:"User",element:<UserAttendence/>},
          {path:"Company",element:<CompanyAttendence/>}
        ]
       },
      { path: "/test", element: <Test /> },

      {
        path: "/Company",
        element: <Company />,
      },
      {
        path:"/Holiday",
        element: <HolidayDashBoard/>
      }

      // {
      //   path:"/Client",element:<Client/>
      // }
    ],
  },
  { path: "/signin", element: <Sign_in /> },
  { path: "/signup", element: <Sign_up /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

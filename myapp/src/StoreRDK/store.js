import { configureStore } from "@reduxjs/toolkit";
import analyseDeleteImageSlice from "../FeatureRedux/analyse_delete_image";
import projectcreationSlice from "../FeatureRedux/projectCreation";
import addUser from "../FeatureRedux/adduserSlice";
import allUser from "../FeatureRedux/alluserSlice";
import projectlist from "../FeatureRedux/projectlistSlice";
import subtasklist from "../FeatureRedux/subtaskSlice";
import alltaskuserspecificSlice from "../FeatureRedux/alltaskuserspecific";
import alltaskcreatedbyme from "../FeatureRedux/task/taskassignedbymeSlice";
import taskSlice from "../FeatureRedux/task/updatetaskSlice";
import updateUser from "../FeatureRedux/user/updateUser_slice"; // Import the reducer for editing user
import addtask from "../FeatureRedux/task/addtaskSlice";
import addsubtask from "../FeatureRedux/subTaskSlices/addsubTaskslice";
import projectdetails from "../FeatureRedux/projectSlice/detailproject";
import getsubtasklist from "../FeatureRedux/subTaskSlices/getsubtaskslice";
import { editsubtasklist } from "../FeatureRedux/subTaskSlices/editusbTaskslice";
import deletesubTaskslice from "../FeatureRedux/subTaskSlices/deletesubTaskslice";
import addCompanySlice from "../FeatureRedux/companySlice/addCompanyslice";
import editCompanySlice from "../FeatureRedux/companySlice/editCompanyslice";
import getCompany from "../FeatureRedux/companySlice/getCompanyslice";
import deleteCompanyslice from "../FeatureRedux/companySlice/deleteCompanyslice";
import deleteProjectitem from "../FeatureRedux/projectSlice/deleteProject";
import userDeleteSlice from "../FeatureRedux/user/delteuserslice";
import { reorderSubtask } from "../FeatureRedux/subTaskSlices/reorderSubtaskSlice";
import addRevenue from "../FeatureRedux/RevenueSlice/addRevenueSlice";
import getRevenue from "../FeatureRedux/RevenueSlice/getRevenueSlice";
import editRevenue from "../FeatureRedux/RevenueSlice/editRevenueSlice";
import addExpense from "../FeatureRedux/expenseSlice/addExpenseSlice";
import editExpense from "../FeatureRedux/expenseSlice/editExpenseSlice";
import getExpense from "../FeatureRedux/expenseSlice/getExpenseSlice";
import getExpenseDiscussion from "../FeatureRedux/expenceDiscussionSlice/getExpenceDiscussion";
import addExpenceDiscussion from "../FeatureRedux/expenceDiscussionSlice/createExpenceDiscussionSlice";
import getClientDis from "../FeatureRedux/ClientDisSlice/getClientdisSlice";
import addClientDis from "../FeatureRedux/ClientDisSlice/addClientdisSlice";
import editClientDis from "../FeatureRedux/ClientDisSlice/editClientdisSlice";
import editExpenseDiscussion from "../FeatureRedux/expenceDiscussionSlice/editExpenseDiscussionSlice";
import delRevenue from "../FeatureRedux/RevenueSlice/delRevenueSlice";
import getleaveBalance from "../FeatureRedux/leaveSlice/balanceLeaveSlice";
import applyLeaveUser from "../FeatureRedux/leaveSlice/applyLeaveSlice";
import getLeaveUser from "../FeatureRedux/leaveSlice/getLeaveUserSlice";
import getLeavebyCompany from "../FeatureRedux/leaveSlice/getALLleavebyCompany";
import updateLeaveStatus from "../FeatureRedux/leaveSlice/editStatusLeaveByCompanySlice";
import AddHolidaycreate from "../FeatureRedux/HolidaySlice/AddHolidaySlice";
import addHolidayReducer from "../FeatureRedux/HolidaySlice/AddHolidaySlice";
import AddholidayList from "../FeatureRedux/HolidaySlice/CreateAllHolidaySlice";
import getHolidayList from "../FeatureRedux/HolidaySlice/GetHolidaySlice";
import editHoliday from "../FeatureRedux/HolidaySlice/editSingleHolidaySlice";
// import  DelSingleHoliday  from "../FeatureRedux/HolidaySlice/DeleteSingleHolidaySlice";
import DelSingleHoliday from "../FeatureRedux/HolidaySlice/DeleteSingleHolidaySlice";
import AddOverridesCreate from "../FeatureRedux/HolidaySlice/AddOverridesSlice";
import EditOverrIdesCreate from "../FeatureRedux/HolidaySlice/EditOverridesSlice";
import DelSingleOverrides from "../FeatureRedux/HolidaySlice/DeleteSingleOverrides";
import getShift from "../FeatureRedux/ShiftingSlice/getShiftSlice";
import CreateCheckInUser from "../FeatureRedux/AttendenceSlice/CreateCheckInUserSlice";
import CreateCheckOut from "../FeatureRedux/AttendenceSlice/CreateCheckOutUserSlice";
import GetTodayAttendance from "../FeatureRedux/AttendenceSlice/GetTodayUserAttend";
import GetMonthSalary from "../FeatureRedux/AttendenceSlice/GetMonthlyUserSlice";
import GetStaticsUser from "../FeatureRedux/AttendenceSlice/GetStaticsUserWorkSlice";
import  GetSummaryUser  from "../FeatureRedux/AttendenceSlice/GetSummaryAttendUserSlice";
import GetSummarySlice from "../FeatureRedux/AttendenceSlice/GetSummaryAttendUserSlice"
import  GetEmployeeTotal  from "../FeatureRedux/AttendenceSlice/CreateTotalEmployeeSlice";
import GetEmployeeTotalSlice from "../FeatureRedux/AttendenceSlice/CreateTotalEmployeeSlice";
import  GetTotalGraph  from "../FeatureRedux/AttendenceSlice/GetAttendenceGraph";
import GetReportAttendence  from "../FeatureRedux/AttendenceSlice/GetReportAttendence";
import  createShift  from "../FeatureRedux/ShiftingSlice/AddShiftSlice";
import  deleteShift  from "../FeatureRedux/ShiftingSlice/DeleteShiftSlice";
import  editShift  from "../FeatureRedux/ShiftingSlice/EditShiftSlice";
import  getCompanyMonthlySalary  from "../FeatureRedux/PayrollSlice/PayrollCompanyGraphSlice";
import  generatePayroll  from "../FeatureRedux/PayrollSlice/PayrollCompanyGenerate";
import  getMonthlyPayrollSummary  from "../FeatureRedux/PayrollSlice/PayrollCompanyMonthlySalary";

export const store = configureStore({
  reducer: {
    DeleteImage: analyseDeleteImageSlice,
    AddProject: projectcreationSlice,
    addUser: addUser,
    allUser: allUser,
    projectlist: projectlist,
    subtasklist: subtasklist,
    alltaskuserspecificSlice: alltaskuserspecificSlice,
    alltaskcreatedbyme: alltaskcreatedbyme,
    tasks: taskSlice,
    addtask: addtask,
    user: updateUser, // Add the reducer here
    projectdetails: projectdetails,
    addsubtask: addsubtask,
    getsubtasklist: getsubtasklist,
    editsubtasklist: editsubtasklist,
    deletesubTaskslice: deletesubTaskslice,
    addcompanyform: addCompanySlice,
    editCompanySlice: editCompanySlice,
    getCompany: getCompany,
    deleteCompanyslice: deleteCompanyslice,
    deleteProjectitem: deleteProjectitem,
    userDeleteSlice: userDeleteSlice,
    reorderSubtask: reorderSubtask,
    addRevenue: addRevenue,
    getRevenue: getRevenue,
    editRevenue: editRevenue,
    addExpense: addExpense,
    editExpense: editExpense,
    getExpense: getExpense,
    addExpenceDiscussion: addExpenceDiscussion,
    getExpenseDiscussion: getExpenseDiscussion,
    getClientDis: getClientDis,
    addClientDis: addClientDis,
    editRevenue: editRevenue,
    editClientDis: editClientDis,
    editExpenseDiscussion: editExpenseDiscussion,
    delRevenue: delRevenue,
    getleaveBalance: getleaveBalance,
    applyLeaveUser: applyLeaveUser,
    getLeaveUser: getLeaveUser,
    getLeavebyCompany: getLeavebyCompany,
    updateLeaveStatus: updateLeaveStatus,
    addHoliday: addHolidayReducer,
    AddholidayList: AddholidayList,
    getHolidayList: getHolidayList,
    editHoliday: editHoliday,
    DelSingleHoliday: DelSingleHoliday,
    AddOverridesCreate: AddOverridesCreate,
    EditOverrIdesCreate: EditOverrIdesCreate,
    DelSingleOverrides: DelSingleOverrides,
    getShift: getShift,
    CreateCheckInUser: CreateCheckInUser,
    CreateCheckOut: CreateCheckOut,
    GetTodayAttendance: GetTodayAttendance,
    GetMonthSalary: GetMonthSalary,
    GetStaticsUser: GetStaticsUser,
    GetSummaryUser:GetSummaryUser,
    GetSummarySlice:GetSummarySlice,
  //   GetEmployeeTotal:GetEmployeeTotal,
  //  GetEmployeeTotalSlice:GetEmployeeTotalSlice
 GetEmployeeTotal: GetEmployeeTotal,
 GetTotalGraph:GetTotalGraph,
 GetReportAttendence:GetReportAttendence,
 createShift: createShift,
 deleteShift: deleteShift,
 editShift:editShift,
 getCompanyMonthlySalary:getCompanyMonthlySalary,
  generatePayroll:generatePayroll,
  getMonthlyPayrollSummary:getMonthlyPayrollSummary


  },
});

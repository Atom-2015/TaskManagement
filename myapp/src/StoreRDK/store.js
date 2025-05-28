import { configureStore } from '@reduxjs/toolkit';
import analyseDeleteImageSlice from '../FeatureRedux/analyse_delete_image';
import projectcreationSlice from '../FeatureRedux/projectCreation';
import addUser from '../FeatureRedux/adduserSlice';
import allUser from '../FeatureRedux/alluserSlice';
import projectlist from '../FeatureRedux/projectlistSlice';
import subtasklist from '../FeatureRedux/subtaskSlice';
import alltaskuserspecificSlice from '../FeatureRedux/alltaskuserspecific';
import alltaskcreatedbyme from '../FeatureRedux/task/taskassignedbymeSlice';
import taskSlice from '../FeatureRedux/task/updatetaskSlice';
import updateUser from '../FeatureRedux/user/updateUser_slice'; // Import the reducer for editing user
import addtask  from '../FeatureRedux/task/addtaskSlice';
import addsubtask from '../FeatureRedux/subTaskSlices/addsubTaskslice';
import projectdetails from '../FeatureRedux/projectSlice/detailproject';
import getsubtasklist from '../FeatureRedux/subTaskSlices/getsubtaskslice'
import { editsubtasklist } from '../FeatureRedux/subTaskSlices/editusbTaskslice';
import deletesubTaskslice from '../FeatureRedux/subTaskSlices/deletesubTaskslice';
import addCompanySlice  from '../FeatureRedux/companySlice/addCompanyslice';
import editCompanySlice from '../FeatureRedux/companySlice/editCompanyslice';
import  getCompany  from '../FeatureRedux/companySlice/getCompanyslice';
import deleteCompanyslice from '../FeatureRedux/companySlice/deleteCompanyslice';
import deleteProjectitem from '../FeatureRedux/projectSlice/deleteProject';
import userDeleteSlice from '../FeatureRedux/user/delteuserslice';
import {reorderSubtask} from '../FeatureRedux/subTaskSlices/reorderSubtaskSlice';
import  addRevenue  from '../FeatureRedux/RevenueSlice/addRevenueSlice';
import  getRevenue  from '../FeatureRedux/RevenueSlice/getRevenueSlice';
import  editRevenue  from '../FeatureRedux/RevenueSlice/editRevenueSlice';
import addExpense  from '../FeatureRedux/expenseSlice/addExpenseSlice';
import  editExpense  from '../FeatureRedux/expenseSlice/editExpenseSlice';
import  getExpense  from '../FeatureRedux/expenseSlice/getExpenseSlice';
<<<<<<< HEAD
import  getClientDis  from '../FeatureRedux/ClientDisSlice/getClientdisSlice';
import  addClientDis  from '../FeatureRedux/ClientDisSlice/addClientdisSlice';
=======
import  getExpenseDiscussion  from '../FeatureRedux/expenceDiscussionSlice/getExpenceDiscussion';
import  addExpenceDiscussion from '../FeatureRedux/expenceDiscussionSlice/createExpenceDiscussionSlice';
>>>>>>> 0ebb430b647305bca78717a37b092ce0472cca59



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
        addtask:addtask,
        user: updateUser, // Add the reducer here
        projectdetails:projectdetails,
        addsubtask:addsubtask,
        getsubtasklist:getsubtasklist,
        editsubtasklist:editsubtasklist,
        deletesubTaskslice:deletesubTaskslice,
        addcompanyform:addCompanySlice,
        editCompanySlice:editCompanySlice,
        getCompany:getCompany,     
        deleteCompanyslice:deleteCompanyslice,  
        deleteProjectitem:deleteProjectitem,
        userDeleteSlice:userDeleteSlice,
        reorderSubtask:reorderSubtask,
        addRevenue:addRevenue,
        getRevenue:getRevenue,
        editRevenue:editRevenue,
        addExpense:addExpense,
        editExpense:editExpense,
        getExpense:getExpense,
<<<<<<< HEAD
        getClientDis:getClientDis,
        addClientDis:addClientDis



=======
        getExpenseDiscussion:getExpenseDiscussion,
        addExpenceDiscussion:addExpenceDiscussion,
>>>>>>> 0ebb430b647305bca78717a37b092ce0472cca59
    },
});

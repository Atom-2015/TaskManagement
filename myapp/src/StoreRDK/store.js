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
        addcompanyform: addCompanySlice,


        


    },
});

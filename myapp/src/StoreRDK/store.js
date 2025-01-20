import {configureStore} from '@reduxjs/toolkit';
import analyseDeleteImageSlice from '../FeatureRedux/analyse_delete_image'
import projectcreationSlice from '../FeatureRedux/projectCreation'
import  addUser  from '../FeatureRedux/adduserSlice';
import  allUser  from '../FeatureRedux/alluserSlice';
import  projectlist  from '../FeatureRedux/projectlistSlice';
import subtasklist from '../FeatureRedux/subtaskSlice';
 


export  const store = configureStore({
    reducer:{
        
        DeleteImage:analyseDeleteImageSlice,
        AddProject:projectcreationSlice,
        addUser:addUser,
        allUser:allUser,
        projectlist:projectlist,
        subtasklist: subtasklist
    }


});
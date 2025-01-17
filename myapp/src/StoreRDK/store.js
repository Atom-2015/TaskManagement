import {configureStore} from '@reduxjs/toolkit';
import analyseDeleteImageSlice from '../FeatureRedux/analyse_delete_image'
import projectcreationSlice from '../FeatureRedux/projectCreation'
import  addUser  from '../FeatureRedux/adduserSlice';
 


export  const store = configureStore({
    reducer:{
        
        DeleteImage:analyseDeleteImageSlice,
        AddProject:projectcreationSlice,
        addUser:addUser
    }


});
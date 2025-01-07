import {configureStore} from '@reduxjs/toolkit';
import management_userCreation_slice from '../FeatureRedux/management_userCreation_slice'
import analyseFastInspactionSlice from '../FeatureRedux/analyse_FastInspaction'
import analyseDeleteImageSlice from '../FeatureRedux/analyse_delete_image'
import analyseUpdateDeleteUser from '../FeatureRedux/analyse_Delete_user'
import analyseUpdateUnassignTags from '../FeatureRedux/analyse_unassign_tags'
import User_Name from '../FeatureRedux/User_Name'
import management_delete_company  from '../FeatureRedux/management_delete_company';


export  const store = configureStore({
    reducer:{
        management_userCreation : management_userCreation_slice,
        FastInspactionCreation : analyseFastInspactionSlice,
        DeleteImage:analyseDeleteImageSlice,
        DeleteUser:analyseUpdateDeleteUser,
        unassign: analyseUpdateUnassignTags,
        User_Name:User_Name,
        deletecompany:management_delete_company,
    }
});
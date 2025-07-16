import { createContext, useContext, useState } from "react";

const DateFilterContext=createContext();

export const DateFilterProvider=({children}) =>{
    const [month,setMonth]=useState(new Date().getMonth() + 1);
    const [year,setYear]=useState(new Date().getFullYear());


    return(
        <DateFilterContext.Provider value={{month,year,setMonth,setYear}}>
            {children}
         </DateFilterContext.Provider>
    )

}

export const useDateFilter=()=>useContext(DateFilterContext)
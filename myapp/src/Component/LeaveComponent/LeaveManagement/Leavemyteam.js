import React, { useState } from "react";
import DonutChart from "../Donutcharts";
import Myteamtable from "./Myteamtable";
import AddLeavePolicy from "./AddLeavePolicy";



const Leavemyteam = () => {
 

  const chartLabels = ["Present", "Absent"];
 

  return (
    <div>
      <div className="w-full h-[835px] rounded p-3 bg-white">
        <div>
            <div>
              <AddLeavePolicy/>
            </div>

          <div>
            <Myteamtable/>
          </div>
        </div>

        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Leavemyteam;
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CreateCheckInUser } from "../../FeatureRedux/AttendenceSlice/CreateCheckInUserSlice";
import moment from "moment";
import { CreateCheckOut } from "../../FeatureRedux/AttendenceSlice/CreateCheckOutUserSlice";
import { GetTodayAttendance } from "../../FeatureRedux/AttendenceSlice/GetTodayUserAttend";
import Swal from "sweetalert2";
import { getShift } from "../../FeatureRedux/ShiftingSlice/getShiftSlice";
import { jwtDecode } from "jwt-decode";

const TimeCard = () => {
  const dispatch = useDispatch();
  const [liveWorker, setLiveWorker] = useState("0h 0m");

  useEffect(() => {
    dispatch(GetTodayAttendance());
    dispatch(getShift());
  }, [dispatch]);

  const { getData, isLoading } = useSelector((state) => state.getShift || {});
  const shiftOptions = getData?.shifts?.map((shift) => ({
    id: shift._id,
    in: shift.punchIn,
    out: shift.punchOut,
    name: shift.name,
  }));

  const { isloading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.CreateCheckInUser
  );
  const todayAttendance = useSelector((state) => state.GetTodayAttendance.data);

  const handleCheckin = async () => {
    const attendance = await dispatch(GetTodayAttendance());
    const alreadyCheckedIn =
      GetTodayAttendance.fulfilled.match(attendance) &&
      attendance.payload?.check_in_time;

    if (alreadyCheckedIn) {
      return Swal.fire({
        icon: "info",
        title: "Already Checked In",
        text: `You already punched in today at ${attendance.payload.check_in_time}`,
        confirmButtonColor: "#3B82F6",
      });
    }

    const check_in_time = moment().format("HH:mm");
    const resultAction = await dispatch(CreateCheckInUser(check_in_time));

    if (CreateCheckInUser.fulfilled.match(resultAction)) {
      dispatch(GetTodayAttendance());

      Swal.fire({
        icon: "success",
        title: "Punched In",
        text: `Check-in time: ${check_in_time}`,
        confirmButtonColor: "#10B981",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Check-In Failed",
        text: "Something went wrong. Try again.",
      });
    }
  };

  const handleCheckOut = async () => {
    const attendance = await dispatch(GetTodayAttendance());
    const alreadyCheckedOut =
      GetTodayAttendance.fulfilled.match(attendance) &&
      attendance.payload?.check_out_time;

    if (alreadyCheckedOut) {
      return Swal.fire({
        icon: "info",
        title: "Already Checked Out",
        text: `You already punched out today at ${attendance.payload.check_out_time}`,
        confirmButtonColor: "#3B82F6",
      });
    }

    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to punch out for today.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Punch Out",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#EF4444",
    });

    if (!confirmation.isConfirmed) return;

    const check_out_time = moment().format("HH:mm");
    const resultAction = await dispatch(CreateCheckOut(check_out_time));

    if (CreateCheckOut.fulfilled.match(resultAction)) {
      dispatch(GetTodayAttendance());

      Swal.fire({
        icon: "success",
        title: "Punched Out",
        text: `Check-out time: ${check_out_time}`,
        confirmButtonColor: "#10B981",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Check-Out Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  const getLiveWorkedTime = (checkInTimeStr) => {
    if (!checkInTimeStr) return "0h 0m";

    const now = moment();
    const checkIn = moment(checkInTimeStr, "HH:mm");
    const diffMinutes = now.diff(checkIn, "minutes");

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  const parseHMToDecimal = (hmString) => {
    const match = hmString.match(/(\d+)h\s+(\d+)m/);
    if (!match) return 0;
    const [, h, m] = match;
    return parseInt(h) + parseInt(m) / 60;
  };

  useEffect(() => {
    const checkInTime = todayAttendance?.check_in_time;
    const checkOutTime = todayAttendance?.check_out_time;

    if (checkInTime && !checkOutTime) {
      setLiveWorker(getLiveWorkedTime(checkInTime));

      const intervalId = setInterval(() => {
        setLiveWorker(getLiveWorkedTime(checkInTime));
      }, 10000);

      return () => clearInterval(intervalId);
    } else if (checkOutTime) {
      setLiveWorker(todayAttendance?.workingHours || "0h 0m");
    }
  }, [todayAttendance]);

  const liveDecimal = parseHMToDecimal(liveWorker);
  const percentage = (liveDecimal / 8.5) * 100;

  const shitfby = shiftOptions?.find(
    (shiftss) => shiftss.id === todayAttendance?.shiftId
  );

  return (
    <div className="w-[30%] border border-gray-400 h-[full] p-4 rounded-2xl shadow-md bg-white text-center space-y-4">
      <div className="relative flex justify-center items-center mb-4">
        {todayAttendance?.status === "Late" && (
          <div className="absolute left-0 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
            {todayAttendance.status}
          </div>
        )}
        <div className="text-blue-600 font-bold text-lg">Timesheet</div>
      </div>

      <div className="text-gray-500 text-sm">
        {todayAttendance
          ? moment(todayAttendance.date).format("DD MMM YYYY")
          : "No date"}
      </div>

      <div className="bg-gray-100 rounded-xl px-4 py-2 mt-[-10px]">
        <div className="text-xs text-gray-400">Punch In at</div>
        <div className="text-sm text-gray-700 font-medium">
          {todayAttendance
            ? `${moment(todayAttendance.date).format("ddd, Do MMM YYYY")} ${
                todayAttendance.check_in_time
              }`
            : "Not punched in yet"}
        </div>
      </div>

      {/* Circular Progress */}
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx="50%"
            cy="50%"
            r="48"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50%"
            cy="50%"
            r="48"
            stroke={todayAttendance?.status === "Late" ? "#ef4444" : "#3b82f6"}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="301.59"
            strokeDashoffset={301.59 - (301.59 * percentage) / 100}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
          {liveWorker}
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <button
          onClick={handleCheckin}
          className="bg-green-400 hover:bg-green-500 text-white py-2 px-6 rounded-full font-semibold"
        >
          Punch In
        </button>

        <button
          onClick={handleCheckOut}
          className="bg-green-400 hover:bg-green-500 text-white py-2 px-6 rounded-full font-semibold"
        >
          Punch Out
        </button>
      </div>

      {/* Footer Stats */}
      <div className="flex justify-between text-sm text-gray-600 px-4">
        <div>
          <div className="font-bold">Shift Start</div>
          <div>{shitfby?.in || "--"} </div>
        </div>
        <div>
          <div className="font-bold "></div>
          <div className="text-2xl text-blue-600">{shitfby?.name || "--"} </div>
        </div>
        <div>
          <div className="font-bold">Shift End</div>
          <div>{shitfby?.out || "--"}</div>
        </div>
      </div>
    </div>
  );
};

export default TimeCard;

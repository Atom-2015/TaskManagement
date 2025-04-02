import React, { useEffect, useState, useRef } from "react";
import { SiLimesurvey } from "react-icons/si";
import { GiCannonBall } from "react-icons/gi";
import { MdOutlineAttachFile } from "react-icons/md";
import { LuAlarmClockCheck } from "react-icons/lu";
import { FaArrowsLeftRightToLine } from "react-icons/fa6";
import { PiRepeatBold } from "react-icons/pi";
import FileUpload from "./fileUploadandReminder/FileUpload";
import Reminder from "./fileUploadandReminder/Reminder";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addtask } from "../../../FeatureRedux/task/addtaskSlice";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import Calender from "react-calendar";
import { Country, State, City } from "country-state-city";
import { AudioRecorder } from 'react-audio-voice-recorder';
import { FaClock } from "react-icons/fa";
import { allUser } from '../../../FeatureRedux/alluserSlice'
import { projectlist } from '../../../FeatureRedux/projectlistSlice'

import WaveSurfer from 'wavesurfer.js';
import {
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  FormHelperText,
  DialogContent,
  Fade,
} from "@mui/material";

function AddAssignedTask({ isModalOpen, closemodal }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    ProjectName: "",
    taskAssign: '',
    description: "",
    loopUsers: [],
    start_date: "",
    end_date: "",
    priority: "LOW",
    fileName: "",

    budget: "",
    repeat: [],
    reminder: '',
    audioFile: null,
  });

  const { isLoading, isError, errorMessage, isAdded } = useSelector(
    (state) => state.addtask || { isLoading: false, isError: false, errorMessage: "", isAdded: false }
  );

  const [selectDates, setSelectDates] = useState([new Date()]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [reminderInfo, setReminderInfo] = useState(null);
  const [repeatType, setRepeatType] = useState("daily");
  const [repeatDays, setRepeatDays] = useState([]);
  const [repeatWeeks, setRepeatWeeks] = useState([]);
  const [repeatMonths, setRepeatMonths] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);


  const getCurrentWeekNumber = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const pastDaysOfMonth = (today - firstDayOfMonth) / (1000 * 60 * 60 * 24);
    return Math.ceil((pastDaysOfMonth + firstDayOfMonth.getDay() + 1) / 7);
  };

  // Handle repeat type change
  const handleRepeatTypeChange = (e) => {
    setRepeatType(e.target.value);
  };

  // Handle selecting particular days for daily repeat
  const handleRepeatDaysChange = (day) => {
    setRepeatDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  // Handle selecting weeks for weekly repeat
  const handleRepeatWeeksChange = (week) => {
    setRepeatWeeks((prevWeeks) =>
      prevWeeks.includes(week)
        ? prevWeeks.filter((w) => w !== week)
        : [...prevWeeks, week]
    );
  };

  // Handle selecting months for monthly repeat
  const handleRepeatMonthsChange = (month) => {
    setRepeatMonths((prevMonths) =>
      prevMonths.includes(month)
        ? prevMonths.filter((m) => m !== month)
        : [...prevMonths, month]
    );
  };

  // Update form data when repeat options change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      repeatType,
      repeatDays,
      repeatWeeks,
      repeatMonths,
    }));
  }, [repeatType, repeatDays, repeatWeeks, repeatMonths]);


  const projectData = useSelector((s) => s.projectlist.projects)
  // console.log(JSON.stringify(projectData , null , 2))

  useEffect(() => {
    dispatch(projectlist())
  }, [])


  useEffect(() => {
    const fetchCountries = Country.getAllCountries();
    setCountries(fetchCountries);
  }, []);

  // const addAudioElement = (blob) => {
  //   const url = URL.createObjectURL(blob);
  //   const audio = document.createElement("audio");
  //   audio.src = url;
  //   audio.controls = true;
  //   document.body.appendChild(audio);
  // };

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4F46E5',
        progressColor: '#3730A3',
        cursorColor: '#3730A3',
        barWidth: 3,
        barRadius: 3,
        responsive: true,
        height: 100,
        normalize: true,
        partialRender: true,
      });

      wavesurfer.current.on('ready', () => {
        console.log('WaveSurfer is ready');
      });

      wavesurfer.current.on('error', (err) => {
        console.error('WaveSurfer error:', err);
      });
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, []);

  const handleStopRecording = (blob) => {
    const audioUrl = URL.createObjectURL(blob);
    setAudioBlob(blob);
    setFormData({
      ...formData,
      fileName: 'Recorded Audio',
      audioFile: blob,
    });

    if (wavesurfer.current) {
      wavesurfer.current.loadBlob(blob);
    }
  };

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    setSelectedState("");
    setSelectedCity("");

    const fetchState = State.getStatesOfCountry(countryCode);
    setStates(fetchState);

    setFormData((prev) => ({
      ...prev,
      country: countries.find((c) => c.isoCode === countryCode)?.name || "",
      state: "",
      city: "",
    }));
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);
    setSelectedCity("");

    const fetchCities = City.getCitiesOfState(selectedCountry, stateCode);
    if (Array.isArray(fetchCities)) {
      setCities(fetchCities);
    } else {
      console.error("No cities returned or invalid data format.");
    }

    setFormData((prev) => ({
      ...prev,
      state: states.find((s) => s.isoCode === stateCode)?.name || "",
      city: "",
    }));
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);

    setFormData((prev) => ({
      ...prev,
      city: cityName,
    }));
  };

  const handleReminderDataSave = (reminderData) => {
    setReminderInfo(reminderData);

    setFormData((prevFormdata) => ({
      ...prevFormdata,
      reminder: reminderData,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "loopUsers") {
      console.log("tjhis is value", value)

      // Handle multiple selections for loopUsers
      setFormData((prevData) => ({

        ...prevData,
        [name]: Array.isArray(value) ? value : [value], // ✅ Correct way to handle multiple selections
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handlePriorityChange = (newPriority) => {
    setFormData((prevState) => ({
      ...prevState,
      priority: newPriority,
    }));
  };

  const handleFileChange = (index) => {
    const file = index.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        fileName: file.name,
        audioFile: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addtask(formData));
  };

  const handleMultpleDay = (date) => {
    setSelectDates((prevDates) => {
      const isSelected = prevDates.find((d) => d.toDateString() === date.toDateString());

      if (isSelected) {
        return prevDates.filter((d) => d.toDateString() !== date.toDateString());
      } else {
        return [...prevDates, date];
      }
    });

    setFormData((prev) => ({
      ...prev,
      repeatDates: selectDates.map((d) => d.toISOString()),
    }));
  };


  const user = useSelector((state) => state.allUser.users);
  // console.log(`this is the data of all users ${JSON.stringify(user)}`);

  useEffect(() => {
    dispatch(allUser())
  }, [])

  return (
    <Dialog open={isModalOpen} TransitionComponent={Fade} transitionDuration={900} onClose={closemodal} fullWidth maxWidth="md">
      <DialogTitle className="text-center bg-gray-800 relative text-gray-100">
        Assign New Task
        <IconButton onClick={closemodal} sx={{ position: "absolute", top: 8, right: 8, color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="bg-gray-800 text-white p-6">
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          {/* Project Name */}
          <FormControl fullWidth sx={{ bgcolor: "gray.900", marginTop: "10px" }}>
            <InputLabel id="user-task-assign-label" sx={{ color: "white", "&.Mui-focused": { color: "white" } }}>
              Project Name
            </InputLabel>
            <Select
              labelId="user-task-assign-label"
              id="user-task-assign"
              name="ProjectName"
              value={formData.ProjectName}
              onChange={handleInputChange}
              label="Project Name"
              sx={{
                color: "white",
                borderRadius: "15px",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "& .MuiSvgIcon-root": { color: "white" },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "gray",
                    color: "white",
                    "& .MuiMenuItem-root:hover": { bgcolor: "black" },
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Select User</em>
              </MenuItem>
              {projectData.map((p) => (
                <MenuItem key={p._id} value={p._id}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "white" }}></FormHelperText>
          </FormControl>


          <FormControl fullWidth sx={{ bgcolor: "gray.900", marginTop: "10px" }}>
            <InputLabel id="task-assign-label" sx={{ color: "white", "&.Mui-focused": { color: "white" } }}>
              User Task Assign
            </InputLabel>
            <Select
              labelId="task-assign-label"
              id="task-assign"
              name="taskAssign"
              value={formData.taskAssign}
              onChange={handleInputChange}
              label="User Task Assign"
              sx={{
                color: "white",
                borderRadius: "15px",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "& .MuiSvgIcon-root": { color: "white" },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "gray",
                    color: "white",
                    "& .MuiMenuItem-root:hover": { bgcolor: "black" },
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>User Task Assign</em>
              </MenuItem>
              {user ? user.map((u) => (
                <MenuItem key={u._id} value={u.name}>
                  {u.name}
                </MenuItem>
              )) : (
                <MenuItem value="">
                  <em> No User Found</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>


          {/* Task Name */}
          <TextField
            fullWidth
            label="Task Title"
            variant="outlined"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray", borderWidth: "0.25px", borderRadius: "15px" },
                "&:hover fieldset": { borderColor: "white", borderWidth: "0.25px" },
                "&.Mui-focused fieldset": { borderColor: "white", borderWidth: "0.25px" },
              },
            }}
          />

          {/* Description */}
          <TextField
            fullWidth
            label="Short description of the task..."
            multiline
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray", borderWidth: "0.25px", borderRadius: "15px" },
                "&:hover fieldset": { borderColor: "white", borderWidth: "0.25px" },
                "&.Mui-focused fieldset": { borderColor: "white", borderWidth: "0.25px" },
              },
            }}
          />

          {/* Dropdowns - User Task Assign & Category */}
          <div className="flex gap-4">
            {/* User Task Assign */}


            {/* Category Selection */}
            <FormControl fullWidth sx={{ bgcolor: "gray.900", marginTop: "10px" }}>
              <InputLabel id="category-label" sx={{ color: "white", "&.Mui-focused": { color: "white" } }}>
                Select Category
              </InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="Select Category"
                sx={{
                  color: "white",
                  borderRadius: "15px",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  "& .MuiSvgIcon-root": { color: "white" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "gray",
                      color: "white",
                      "& .MuiMenuItem-root:hover": { bgcolor: "black" },
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em>Select Category</em>
                </MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Survey">Survey</MenuItem>
                <MenuItem value="Management">Management</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Select User to Keep in Loop */}

          <FormControl fullWidth sx={{ bgcolor: "gray.900", marginTop: "10px" }}>
            <InputLabel id="task-assign-label" sx={{ color: "white", "&.Mui-focused": { color: "white" } }}>
              Select User in loop
            </InputLabel>
            <Select
              labelId="loop-users-label"
              id="loop-users"
              name="loopUsers"
              multiple // ✅ Added `multiple` prop
              value={formData.loopUsers}
              onChange={handleInputChange}
              label="Select User in Loop"
              sx={{
                color: "white",
                borderRadius: "15px",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "& .MuiSvgIcon-root": { color: "white" },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "gray",
                    color: "white",
                    "& .MuiMenuItem-root:hover": { bgcolor: "black" },
                  },
                },
              }}
            >
              {user ? user.map((u) => (
                <MenuItem key={u._id} value={u._id}>
                  {u.name}
                </MenuItem>
              )) : (
                <MenuItem value="">
                  <em> No User Found</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>


          {/* Priority */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-100">Priority</span>
            {["High", "Medium", "Low"].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => handlePriorityChange(level)}
                className={`px-3 py-1 rounded-md ${formData.priority === level ? "bg-green-500 text-black font-bold" : "bg-gray-700 text-white"}`}
              >
                {formData.priority === level ? "✔ " : ""} {level}
              </button>
            ))}
          </div>

          {/* Repeat Task */}
          <div className="flex items-center gap-3 ml-3 p-3">
            <PiRepeatBold className="text-gray-300 text-lg" />
            <span className="text-white">REPEAT</span>
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="repeat"
                onChange={handleInputChange}
                checked={formData.repeat}
                className="peer hidden"
              />
              <div className="w-7 h-7 rounded-full border-2 border-gray-500 bg-gray-800 peer-checked:bg-green-500 peer-checked:border-green-400 transition duration-300 flex items-center justify-center peer-checked:shadow-[0_0_10px_rgba(34,197,94,0.8)]">
                {formData.repeat && (
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <span className="text-green-500 font-bold text-xs">✔</span>
                  </div>
                )}
              </div>
            </label>
          </div>

          {formData.repeat && (
            <div>
              <FormControl fullWidth sx={{ bgcolor: "gray.900", marginTop: "10px" }}>
                <InputLabel id="repeat-type-label" sx={{ color: "white", "&.Mui-focused": { color: "white" } }}>
                  Repeat Type
                </InputLabel>
                <Select
                  labelId="repeat-type-label"
                  id="repeat-type"
                  value={repeatType}
                  onChange={handleRepeatTypeChange}
                  label="Repeat Type"
                  sx={{
                    color: "white",
                    borderRadius: "15px",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "& .MuiSvgIcon-root": { color: "white" },
                  }}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>

                                      {/* Daily Repeat Section */}
                                      {/* {repeatType === "daily" && (
                            <div className="mt-4">
                              <h4 className="text-white">Select Particular Days</h4>
                              <div className="flex flex-wrap gap-2">
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                  <button
                                    key={day}
                                    type="button"
                                    onClick={() => handleRepeatDaysChange(day)}
                                    className={`px-3 py-1 rounded-md ${repeatDays.includes(day) ? "bg-green-500 text-black font-bold" : "bg-gray-700 text-white"}`}
                                  >
                                    {repeatDays.includes(day) ? "✔ " : ""} {day}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )} */}

              {/* Weekly Repeat Section */}
              {repeatType === "weekly" && (
                <div className="mt-4">
                  <h4 className="text-white">Select Days of the Week</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleRepeatDaysChange(day)}
                        className={`px-3 py-1 rounded-md ${repeatDays.includes(day) ? "bg-green-500 text-black font-bold" : "bg-gray-700 text-white"}`}
                      >
                        {repeatDays.includes(day) ? "✔ " : ""} {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Monthly Repeat Section */}
              {repeatType === "monthly" && (
                <div className="mt-4">
                  <h4 className="text-white">Select Months</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ].map((month) => (
                      <button
                        key={month}
                        type="button"
                        onClick={() => handleRepeatMonthsChange(month)}
                        className={`px-3 py-1 rounded-md ${repeatMonths.includes(month) ? "bg-green-500 text-black font-bold" : "bg-gray-700 text-white"}`}
                      >
                        {repeatMonths.includes(month) ? "✔ " : ""} {month}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Budget */}
          <TextField
            fullWidth
            label="Budget"
            variant="outlined"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: "#fff" } }}
            type="number"
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray", borderWidth: "0.25px", borderRadius: "15px" },
                "&:hover fieldset": { borderColor: "white", borderWidth: "0.25px" },
                "&.Mui-focused fieldset": { borderColor: "white", borderWidth: "0.25px" },
              },
            }}
          />

          {/* Country, State, and City Dropdowns */}
          {/* <div className="flex flex-row justify-center gap-3">
            <FormControl fullWidth sx={{ bgcolor: "gray.900", marginTop: "10px" }}>
              <InputLabel sx={{ color: "#fff" }}>Country</InputLabel>
              <Select
                value={selectedCountry}
                onChange={handleCountryChange}
                label="Country"
                sx={{
                  color: "white",
                  borderRadius: "15px",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  "& .MuiSvgIcon-root": { color: "white" },
                }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ bgcolor: "gray.900", marginTop: "10px" }}>
              <InputLabel sx={{ color: "#fff" }}>State</InputLabel>
              <Select
                value={selectedState}
                onChange={handleStateChange}
                label="State"
                sx={{
                  color: "white",
                  borderRadius: "15px",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  "& .MuiSvgIcon-root": { color: "white" },
                }}
              >
                {states.map((state) => (
                  <MenuItem key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ bgcolor: "gray.900", marginTop: "10px" }}>
              <InputLabel sx={{ color: "#fff" }}>City</InputLabel>
              <Select
                value={selectedCity}
                onChange={handleCityChange}
                label="City"
                sx={{
                  color: "white",
                  borderRadius: "15px",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  "& .MuiSvgIcon-root": { color: "white" },
                }}
              >
                {cities.map((city) => (
                  <MenuItem key={city.name} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div> */}

          {/* Date Picker */}
          <FormControl
            fullWidth
            sx={{
              bgcolor: "gray.900",
              marginTop: "10px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray", borderWidth: "0.25px", borderRadius: "15px" },
                "&:hover fieldset": { borderColor: "white", borderWidth: "0.25px" },
                "&.Mui-focused fieldset": { borderColor: "white", borderWidth: "0.25px" },
              },
            }}
          >
            <TextField
              fullWidth
              label="Select End Date"
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
              onClick={(e) => e.target.showPicker()}
              InputLabelProps={{ shrink: true, style: { color: "#fff" } }}
              sx={{
                bgcolor: "gray.900",
                borderRadius: "15px",
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "gray", borderWidth: "0.25px" },
                  "&:hover fieldset": { borderColor: "white", borderWidth: "0.25px" },
                  "&.Mui-focused fieldset": { borderColor: "white", borderWidth: "0.25px" },
                },
              }}
              InputProps={{
                sx: {
                  "&::-webkit-calendar-picker-indicator": {
                    filter: "invert(1)",
                    cursor: "pointer",
                  },
                },
              }}
            />
          </FormControl>

          {/* File Upload and Reminder */}
          <div className="mt-3 mb-3">
            <div className="ml-2 flex flex-row gap-3">
              <div>
                <label className="flex items-center justify-center w-10 h-10 rounded-full transition duration-500 hover:bg-white/20 hover:cursor-pointer hover:from-transparent" title="Upload" onClick={() => setShowFileUpload(true)}>
                  <MdOutlineAttachFile size={25} />
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
                <div className="text-gray-300">{formData.fileName || ""}</div>
              </div>

              <div>
                {/* Voice Recorder button */}
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full transition duration-500 hover:bg-white/20 cursor-pointer"
                  title={isRecording ? "Stop Recording" : "Record Audio"}
                  onClick={() => {
                    if (isRecording) {
                      setIsRecording(false); // Stop recording
                    } else {
                      setIsRecording(true); // Start recording
                    }
                  }}
                >
                  <MdOutlineKeyboardVoice size={20} />
                </div>

                {/* Show the ReactAudioRecorder when recording is true */}
                {isRecording && (
                  <div className="mt-2">
                    <AudioRecorder
                      onStop={handleStopRecording} // Handle stopping the recording
                      onStart={() => setIsRecording(true)} // Handle start of recording
                      onError={(error) => console.error('Recording Error:', error)} // Log any recording errors
                    />

                    <button
                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md"
                      onClick={() => setIsRecording(false)} // Stop recording when clicked
                    >
                      Stop Recording
                    </button>
                  </div>
                )}

                {/* Show the audio player once the recording is done */}
                {formData.audioFile && !isRecording && (
                  <div className="mt-2">
                    <div ref={waveformRef}></div>
                    <audio controls>
                      <source
                        src={URL.createObjectURL(formData.audioFile)}
                        type="audio/wav"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>

              <div>
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full transition duration-500 hover:bg-white/20 cursor-pointer"
                  title="Reminder"
                  onClick={() => setShowReminder(true)}
                >
                  <FaClock size={20} />
                </div>

                {reminderInfo && (
                  <div className="text-gray-300 text-sm mt-1 flex flex-row items-center">
                    {reminderInfo.date}-<FaArrowsLeftRightToLine />-{reminderInfo.time}-<FaArrowsLeftRightToLine />-{reminderInfo.type}
                  </div>
                )}

                {showReminder && <Reminder open={showReminder} onClose={() => setShowReminder(false)} onSave={handleReminderDataSave} />}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              startIcon={<SiLimesurvey />}
              sx={{ borderRadius: "10px" }}
            >
              Assign Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddAssignedTask;
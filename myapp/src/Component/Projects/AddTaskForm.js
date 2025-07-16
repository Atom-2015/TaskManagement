import React, { useEffect, useState, useRef } from "react";
import { SiLimesurvey } from "react-icons/si";
import { GiCannonBall } from "react-icons/gi";
import { MdOutlineAttachFile } from "react-icons/md";
import { LuAlarmClockCheck } from "react-icons/lu";
import { FaArrowsLeftRightToLine } from "react-icons/fa6";
import { PiRepeatBold } from "react-icons/pi";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addtask } from "../../FeatureRedux/task/addtaskSlice";
import { projectlist } from "../../FeatureRedux/projectlistSlice";
import Aos from "aos";
import Swal from "sweetalert2";
import { allUser } from "../../FeatureRedux/alluserSlice";
import Calender from "react-calendar";
import { Country, State, City } from "country-state-city";
import { AudioRecorder } from "react-audio-voice-recorder";
import { FaClock } from "react-icons/fa";
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
  DialogContent,
  Fade,
} from "@mui/material";
import WaveSurfer from "wavesurfer.js";
import { alltasks } from "../../FeatureRedux/subtaskSlice";
import { assigned_by } from "../../FeatureRedux/task/taskassignedbymeSlice";
import { alltaskuserspecific } from "../../FeatureRedux/alltaskuserspecific";
import { projectdetails } from "../../FeatureRedux/projectSlice/detailproject";

function AddTaskForm({ projectId, onSubmit, onCancel }) {
  const dispatch = useDispatch();

  const { isLoading, isError, errorMessage, isAdded } = useSelector(
    (state) => state.AddProject
  );
  const userlist = useSelector((state) => state.allUser.users);

  const editor = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    dispatch(allUser());
    Aos.init({ duration: 800, easing: "ease-in-out", once: true });

    return () => Aos.refresh();
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    taskAssign: "",
    description: "",
    loopUsers: [],
    start_date: "",
    end_date: "",
    status: "Active",
    priority: "LOW",
    budget: "",
    repeat: [],
  });

  const handlaAddTaskSubmit = (e) => {
    e.preventDefault();
    
    // Temporarily increase SweetAlert z-index
    const originalZIndex = Swal.getContainer()?.style.zIndex;
    if (Swal.getContainer()) {
      Swal.getContainer().style.zIndex = '2000';
    }
  
    const submissionData = {
      ...formData,
      state: formData.state || "",
      city: formData.city || "",
    };
  
    dispatch(addtask({ data: submissionData, id: projectId }))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Task Created Successfully",
          text: "Added",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
          didOpen: () => {
            // Ensure z-index is applied when alert opens
            if (Swal.getContainer()) {
              Swal.getContainer().style.zIndex = '2000';
            }
          },
          willClose: () => {
            // Restore original z-index when closing
            if (Swal.getContainer() && originalZIndex) {
              Swal.getContainer().style.zIndex = originalZIndex;
            }
          }
        }).then(() => {
          dispatch(projectdetails(projectId))
          onCancel();
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.message || "Something went wrong",
          icon: "error",
          didOpen: () => {
            if (Swal.getContainer()) {
              Swal.getContainer().style.zIndex = '2000';
            }
          }
        });
      });
  };
  console.log(`yo hai project id ${projectId}`);

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

  const handleRepeatTypeChange = (e) => {
    setRepeatType(e.target.value);
  };

  const handleRepeatDaysChange = (day) => {
    setRepeatDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleRepeatWeeksChange = (week) => {
    setRepeatWeeks((prevWeeks) =>
      prevWeeks.includes(week)
        ? prevWeeks.filter((w) => w !== week)
        : [...prevWeeks, week]
    );
  };

  const handleRepeatMonthsChange = (month) => {
    setRepeatMonths((prevMonths) =>
      prevMonths.includes(month)
        ? prevMonths.filter((m) => m !== month)
        : [...prevMonths, month]
    );
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      repeatType,
      repeatDays,
      repeatWeeks,
      repeatMonths,
    }));
  }, [repeatType, repeatDays, repeatWeeks, repeatMonths]);

  const projectData = useSelector((s) => s.projectlist.projects);

  useEffect(() => {
    dispatch(projectlist());
  }, []);

  useEffect(() => {
    if (waveformRef.current) {
      WaveSurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#4F46E5",
        progressColor: "#3730A3",
        cursorColor: "#3730A3",
        barWidth: 3,
        barRadius: 3,
        responsive: true,
        height: 100,
        normalize: true,
        partialRender: true,
      });

      wavesurfer.current.on("ready", () => {
        console.log("WaveSurfer is ready");
      });

      wavesurfer.current.on("error", (err) => {
        console.error("WaveSurfer error:", err);
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
      fileName: "Recorded Audio",
      audioFile: blob,
    });

    if (wavesurfer.current) {
      wavesurfer.current.loadBlob(blob);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "loopUsers") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: Array.isArray(value) ? value : [value],
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

  const user = useSelector((state) => state.allUser.users);

  return (
    <Dialog open={true} onClose={onCancel} fullWidth maxWidth="md"  sx={{
      '& .MuiDialog-container': {
        zIndex: 1500 
      }
    }}>
      <DialogTitle className="text-center bg-gray-50 relative text-gray-800 ">
        Add Task
        <IconButton
          onClick={onCancel}
          sx={{ position: "absolute", top: 8, right: 8, color: "gray" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="bg-gray-50 text-white p-6">
        <form className="space-y-4 mt-3">
          <TextField
            fullWidth
            label="Task Title"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{
              input: { color: "gray" },
              label: { color: "gray" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#BFDBFE",
                  borderWidth: "0.25px",
                  borderRadius: "15px",
                },
                "&:hover fieldset": {
                  borderColor: "#BFDBFE",
                  borderWidth: "0.5px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#BFDBFE",
                  borderWidth: "0.25px",
                },
              },
            }}
          />

          <FormControl
            fullWidth
            sx={{ bgcolor: "gray.900", marginTop: "10px" }}
          >
            <InputLabel
              id="task-assign-label"
              sx={{ color: "gray", "&.Mui-focused": { color: "gray" } }}
            >
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
                color: "gray",
                borderRadius: "15px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#BFDBFE",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#BFDBFE",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#BFDBFE",
                },
                "& .MuiSvgIcon-root": { color: "gray" },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "white",
                    color: "black",
                    "& .MuiMenuItem-root:hover": { bgcolor: "gray.800" },
                    "& .MuiMenuItem-root:hover": { color: "black" },
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>User Task Assign</em>
              </MenuItem>
              {user ? (
                user.map((u) => (
                  <MenuItem key={u._id} value={u._id}>
                    {u.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  <em> No User Found</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Short description of the task..."
            multiline
            rows={3}
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            InputLabelProps={{ style: { color: "gray" } }}
            sx={{
              input: { color: "gray" },
              label: { color: "gray" },
              "& .MuiInputBase-input": { color: "gray" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#BFDBFE",
                  borderWidth: "0.25px",
                  borderRadius: "15px",
                },
                "&:hover fieldset": {
                  borderColor: "#BFDBFE",
                  borderWidth: "0.25px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#BFDBFE",
                  borderWidth: "0.25px",
                },
              },
            }}
          />

          <FormControl
            fullWidth
            sx={{ bgcolor: "gray.900", marginTop: "10px" }}
          >
            <InputLabel
              id="task-assign-label"
              sx={{ color: "gray", "&.Mui-focused": { color: "gray" } }}
            >
              Select User in loop
            </InputLabel>
            <Select
              labelId="loop-users-label"
              id="loop-users"
              name="loopUsers"
              multiple
              value={formData.loopUsers}
              onChange={handleInputChange}
              label="Select User in Loop"
              sx={{
                color: "gray",
                borderRadius: "15px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#BFDBFE",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#BFDBFE",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#BFDBFE",
                },
                "& .MuiSvgIcon-root": { color: "gray" },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "white",
                    color: "black",
                    "& .MuiMenuItem-root:hover": { bgcolor: "gray.800" },
                    "& .MuiMenuItem-root:hover": { color: "black" },
                  },
                },
              }}
            >
              {user ? (
                user.map((u) => (
                  <MenuItem key={u._id} value={u._id}>
                    {u.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  <em> No User Found</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>

          <div className="flex items-center space-x-4">
            <span className="text-gray-800">Priority</span>
            {["High", "Medium", "Low"].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => handlePriorityChange(level)}
                className={`px-3 py-1 rounded-md ${
                  formData.priority === level
                    ? "bg-green-500 text-black font-bold"
                    : "bg-gray-500 text-white"
                }`}
              >
                {formData.priority === level ? "✔ " : ""} {level}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-3 p-3">
            <PiRepeatBold className="text-gray-700 text-lg" />
            <span className="text-gray-700">REPEAT</span>
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="repeat"
                onChange={handleInputChange}
                checked={formData.repeat}
                className="peer hidden "
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
              <FormControl
                fullWidth
                sx={{ bgcolor: "gray.900", marginTop: "10px" }}
              >
                <InputLabel
                  id="repeat-type-label"
                  sx={{ color: "gray", "&.Mui-focused": { color: "gray" } }}
                >
                  Repeat Type
                </InputLabel>
                <Select
                  labelId="repeat-type-label"
                  id="repeat-type"
                  value={repeatType}
                  onChange={handleRepeatTypeChange}
                  label="Repeat Type"
                  sx={{
                    color: "gray",
                    borderRadius: "15px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#BFDBFE",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#BFDBFE",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#BFDBFE",
                    },
                    "& .MuiSvgIcon-root": { color: "gray" },
                  }}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>

              {repeatType === "weekly" && (
                <div className="mt-4">
                  <h4 className="text-white">Select Days of the Week</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleRepeatDaysChange(day)}
                        className={`px-3 py-1 rounded-md ${
                          repeatDays.includes(day)
                            ? "bg-green-500 text-black font-bold"
                            : "bg-gray-700 text-white"
                        }`}
                      >
                        {repeatDays.includes(day) ? "✔ " : ""} {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {repeatType === "monthly" && (
                <div className="mt-4">
                  <h4 className="text-white">Select Months</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month) => (
                      <button
                        key={month}
                        type="button"
                        onClick={() => handleRepeatMonthsChange(month)}
                        className={`px-3 py-1 rounded-md ${
                          repeatMonths.includes(month)
                            ? "bg-green-500 text-black font-bold"
                            : "bg-gray-700 text-white"
                        }`}
                      >
                        {repeatMonths.includes(month) ? "✔ " : ""} {month}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <FormControl
            fullWidth
            sx={{
              bgcolor: "gray.900",
              marginTop: "10px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#BFDBFE",
                  borderWidth: "0.25px",
                  borderRadius: "15px",
                },
                "&:hover fieldset": {
                  borderColor: "#BFDBFE",
                  borderWidth: "0.25px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#BFDBFE",
                  borderWidth: "0.25px",
                },
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
              InputLabelProps={{ shrink: true, style: { color: "gray" } }}
              sx={{
                bgcolor: "gray.900",
                borderRadius: "15px",
                input: { color: "gray" },
                label: { color: "gray" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#BFDBFE",
                    borderWidth: "0.25px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#BFDBFE",
                    borderWidth: "0.25px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#BFDBFE",
                    borderWidth: "0.25px",
                  },
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

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={(e) => handlaAddTaskSubmit(e)}
              fullWidth
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

export default AddTaskForm;

import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  Fade,
  IconButton,
} from "@mui/material";

const Reminder = ({ open, onClose, onSave }) => {
  const [reminderData, setReminderData] = useState({
    time: "",
    date: "",
    type: "before",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReminderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(reminderData);
    onClose();
  };

  return (
    <Dialog open={open} TransitionComponent={Fade} transitionDuration={500} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-center bg-gray-800 text-gray-100 relative">
        Set Reminder
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8, color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="bg-gray-800 text-white p-6">
        <div className="space-y-4">

          {/* Date Picker */}
          <TextField
            fullWidth
            label="Select Date"
            type="date"
            name="date"
            value={reminderData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true, style: { color: "#fff" } }}
            sx={{
              marginTop:"10px",
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray", borderWidth: "0.25px", borderRadius: "15px" },
                "&:hover fieldset": { borderColor: "white", borderWidth: "0.25px" },
                "&.Mui-focused fieldset": { borderColor: "white", borderWidth: "0.25px" },
              },
            }}
          />

          {/* Time Picker */}
          <TextField
            fullWidth
            label="Select Time"
            type="time"
            name="time"
            value={reminderData.time}
            onChange={handleChange}
            InputLabelProps={{ shrink: true, style: { color: "#fff" } }}
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

          {/* Reminder Type Dropdown (Before / After) */}
          <FormControl
            fullWidth
            sx={{
              marginTop: "10px",
            }}
          >
            <InputLabel
              id="reminder-type-label"
              sx={{
                marginTop:"10px",
                color: "white",
                "&.Mui-focused": { color: "white" },
              }}
            >
              Reminder Type
            </InputLabel>

            <Select
              labelId="reminder-type-label"
              id="reminder-type"
              name="type"
              value={reminderData.type}
              onChange={handleChange}
              label="Reminder Type"
              sx={{
                color: "white",
                marginTop:"10px",
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
              <MenuItem value="before">Before</MenuItem>
              <MenuItem value="after">After</MenuItem>
            </Select>
          </FormControl>

          {/* Save Button */}
          <Button variant="contained" color="success" fullWidth onClick={handleSave} sx={{ borderRadius: "10px" }}>
            Save Reminder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Reminder;

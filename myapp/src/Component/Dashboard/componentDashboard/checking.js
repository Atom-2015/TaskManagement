import React from 'react'

const checking = () => {
  return (
    (
        <div>
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
    
          {/* Display Calendar if Repeat is checked */}
          {formData.repeat && (
            <div>
              <h3>Select Multiple Dates</h3>
              <Calendar onClickDay={handleDateClick} value={selectedDates} />
              <div>
                <h4>Selected Dates:</h4>
                <ul>
                  {selectedDates.map((date, index) => (
                    <li key={index}>{date.toLocaleDateString()}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      );
  )
}

export default checking
import React, { useEffect, useRef } from "react";

const EmployeeStatusModal = ({ title, data, onClose }) => {
  const modalRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    // <div style={{
    //         position: "absolute",
    //         top: 0,
    //         left: 0,
    //         right: 0,
    //         bottom: 0,
    //         width: "90vw",
    //         height: "170vh",
    //         margin: 0,
    //         padding: 0,
    //         zIndex: 9999,
    //       }} className="fixed inset-0 z-50 w-full min-h-screen flex items-center justify-center backdrop-blur-sm bg-black/30">
      
   <div className="fixed inset-0 z-50 w-full min-h-screen flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div
        ref={modalRef}
        className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Modal Content */}
        <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>

        {data.length === 0 ? (
          <p className="text-gray-500 text-sm">No records found.</p>
        ) : (
          <ul className="space-y-2">
            {data.map((emp) => (
              <li
                key={emp.userId}
                className="border rounded p-2 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{emp.name}</p>
                  <p className="text-xs text-gray-600">{emp.designation}</p>
                </div>
                <span className="text-sm font-semibold">{emp.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default React.memo(EmployeeStatusModal);

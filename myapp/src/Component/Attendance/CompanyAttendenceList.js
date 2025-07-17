import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetReportAttendence } from "../../FeatureRedux/AttendenceSlice/GetReportAttendence";
import { useDateFilter } from "../UseContextHook/MonthYearFilter";
import { FaEye } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import moment from "moment";

const CompanyAttendenceList = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { month, year } = useDateFilter();

  const attendReport = useSelector(
    (state) => state.GetReportAttendence.getData?.data || []
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = attendReport.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(attendReport.length / itemsPerPage);

  useEffect(() => {
    dispatch(GetReportAttendence({ month, year }))
      .unwrap()
      .then((res) => {
        console.log("Attendance Report Fetched:", res.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance:", error);
      });
  }, [dispatch, month, year]);

  // const handleCloseMODAL=()=>{
  //   try{

  //   }
  //   catch(Error){
  //     console.error("Error closing modal:", Error);
  //   } 
  // }

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

const exportAllAttendanceToPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(16);

  attendReport.forEach((user, index) => {
    if (index > 0) {
      doc.addPage();
    }

    doc.text(`Attendance Report`, 14, 20);
    doc.setFontSize(14);
    doc.text(`User: ${user.name}`, 14, 30);
    doc.setFontSize(12);
    doc.text(`Month: ${month}   Year: ${year}`, 14, 38);

    const tableData = user.records?.map((rec) => [
      rec.date,
      rec.status,
      rec.source,
      rec.check_in_time && rec.check_in_time !== "null"
        ? rec.check_in_time.length <= 5
          ? rec.check_in_time
          : moment(rec.check_in_time).format("HH:mm")
        : "-",
      rec.check_out_time && rec.check_out_time !== "null"
        ? rec.check_out_time.length <= 5
          ? rec.check_out_time
          : moment(rec.check_out_time).format("HH:mm")
        : "-",
      rec.overtime ? `${rec.overtime} min` : "-",
    ]);

    autoTable(doc, {
      startY: 45,
      head: [["Date", "Status", "Source", "Check-in", "Check-out", "Overtime"]],
      body: tableData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
      margin: { left: 14, right: 14 },
    });
  });

  doc.save("Company_Attendance_Report.pdf");
};


  return (
    <div className="bg-white p-4 w-full rounded-xl shadow border border-gray-300 mx-auto">
      <div className="flex justify-between mb-3">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
          Company User Attendance Report
        </h2>

        <button
          onClick={exportAllAttendanceToPDF}
          className="bg-blue-600 text-white px-2 py-0 rounded hover:bg-blue-700"
        >
          Download All Attendance PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded-lg">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-center">#</th>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Present</th>
              <th className="px-4 py-2 text-center">Absent</th>
              <th className="px-4 py-2 text-center">Attendance %</th>
              <th className="px-4 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr
                key={user.userId}
                className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition"
              >
                <td className="px-4 py-2 text-center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-2 flex items-center gap-2 justify-center">
                  <img
                    src={user.profile_image}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border"
                  />
                  <span>{user.name}</span>
                </td>
                <td className="px-4 py-2 text-center">{user.present}</td>
                <td className="px-4 py-2 text-center">{user.absent}</td>
                <td className="px-4 py-2 text-center">
                  {user.attendancePercentage}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm font-semibold text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {modalOpen && selectedUser && (
        <div
          className="fixed z-[9999] flex items-center justify-center bg-black bg-opacity-50"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "90vw",
            height: "170vh",
            margin: 0,
            padding: 0,
            zIndex: 9999,
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Attendance of {selectedUser.name}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                  <thead className="bg-blue-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Date</th>
                      <th className="px-4 py-3 text-left font-medium">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        Source
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        Check-in
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        Check-out
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        Overtime
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUser.records?.map((rec, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3">{rec.date}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              rec.status === "Present"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {rec.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">{rec.source}</td>
                        <td className="px-4 py-3 font-mono">
                          {rec.check_in_time && rec.check_in_time !== "null"
                            ? rec.check_in_time.length <= 5
                              ? rec.check_in_time // already in HH:mm
                              : moment(rec.check_in_time).format("HH:mm") // fallback if it's full timestamp
                            : "-"}
                        </td>
                        <td className="px-4 py-3 font-mono">
                          {rec.check_out_time && rec.check_out_time !== "null"
                            ? rec.check_out_time.length <= 5
                              ? rec.check_out_time
                              : moment(rec.check_out_time).format("HH:mm")
                            : "-"}
                        </td>

                        <td className="px-4 py-3">
                          {rec.overtime ? `${rec.overtime} min` : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyAttendenceList;

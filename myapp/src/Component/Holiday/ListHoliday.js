import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import ApplyHoliday from "./ApplyHoliday";
import CreateHolidayList from "./CreateHolidayList";
import { useDispatch, useSelector } from "react-redux";
import { getHolidayList } from "../../FeatureRedux/HolidaySlice/GetHolidaySlice";
import { DelSingleHoliday } from "../../FeatureRedux/HolidaySlice/DeleteSingleHolidaySlice";
import Swal from "sweetalert2";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ListHoliday = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    dispatch(getHolidayList());
  }, [dispatch]);

  const { getData } = useSelector((state) => state.getHolidayList);
  const holidays = [...(getData?.holidays || [])].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const handleDelete = (holidayId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This holiday will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DelSingleHoliday(holidayId))
          .then(() => {
            Swal.fire("Deleted!", "The holiday has been deleted.", "success");
            dispatch(getHolidayList());
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong. Try again.", "error");
          });
      }
    });
  };
  const handleOpenCreate = () => setShowCreate((prev) => !prev);
  const handleOpenApply = () => {
    setOpen((prev) => !prev);
    setSelectedHoliday(null);
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    const firstHolidayYear =
      holidays.length > 0 ? new Date(holidays[0].date).getFullYear() : "N/A";

    doc.setFontSize(18);
    doc.text(`Holiday List - ${firstHolidayYear}`, 14, 22);

    const tableColumn = ["#", "Holiday Name", "Date"];
    const tableRows = holidays.map((holiday, index) => [
      index + 1,
      holiday.name,
      new Date(holiday.date).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save(`HolidayList-${firstHolidayYear}.pdf`);
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-xl container mx-auto">
      {/* Header Buttons */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
        <h2 className="text-xl font-semibold text-gray-700">Holiday List</h2>
        <h2
          onClick={exportPDF}
          title="download pdf"
          className="text-red-500 cursor-pointer hover:text-red-700"
        >
          <MdOutlinePictureAsPdf />
        </h2>
        <div className="flex items-center gap-3">
          <button
            className="bg-slate-700 text-white rounded-full px-3 py-1 text-sm"
            onClick={handleOpenCreate}
          >
            Create Holiday
          </button>
          <button
            onClick={handleOpenApply}
            className="text-2xl w-8 h-8 flex items-center justify-center cursor-pointer hover:animate-spin text-green-600"
            title="Add Holiday"
          >
            <IoMdAddCircle />
          </button>
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && <CreateHolidayList onClose={handleOpenCreate} />}

      {/* Table Section */}
      <div className="w-full overflow-x-auto max-h-[60vh] overflow-y-auto border border-gray-200 rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 text-gray-700 text-xs font-bold uppercase sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left w-10 border-r border-gray-300">
                #
              </th>
              <th className="px-4 py-3 text-left border-r border-gray-300">
                Holiday Name
              </th>
              <th className="px-4 py-3 text-left w-44 border-r border-gray-300">
                Date
              </th>
              <th className="px-4 py-3 text-left w-32">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 bg-white divide-y divide-gray-100">
            {holidays.map((holiday, index) => (
              <tr
                key={holiday._id}
                className="hover:bg-indigo-50 transition-all duration-150"
              >
                <td className="px-4 py-3 text-center font-semibold">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-left">{holiday.name}</td>
                <td className="px-4 py-3 text-left">{holiday.date}</td>
                <td className="px-4 py-3 text-left">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedHoliday(holiday);
                        setOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 hover:scale-110 transition-transform"
                      title="Edit"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(holiday._id)}
                      className="text-red-500 hover:text-red-700 hover:scale-110 transition-transform"
                      title="Delete"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Apply Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-xl w-full relative">
            <button
              onClick={handleOpenApply}
              className="absolute top-2 right-4 text-gray-500 hover:text-red-600 text-xl"
              title="Close"
            >
              ×
            </button>
            <ApplyHoliday
              editData={selectedHoliday}
              onClose={handleOpenApply}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListHoliday;

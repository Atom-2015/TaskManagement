import React, { useEffect, useState } from "react";
import RevenueBudget from "./RevenueBudget";
import ExpensesBudget from "./ExpensesBudget";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { projectlist } from "../../../FeatureRedux/projectlistSlice";
import DiscussionRevenue from "./DiscussionRevenue";
import DiscussionExpenses from "./DiscussionExpenses";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

import AddButtonDiscussionExpense from "./addButtonDiscussionExpense";

const Budget = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRevOpen, setIsRevOpen] = useState(false);
  const [clientDisSearch, setClientDisSearch] = useState("");
  const [revenueSearch, setRevenueSearch] = useState("");
  const [expenseSearch,setExpenseSearch] = useState("");
  const [expenseDisSearch,setExpenseDisSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { projects } = useSelector((state) => state.projectlist);

  const findProject = projects.find((pro) => pro._id === id);

  useEffect(() => {
    dispatch(projectlist({}));
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-tr from-indigo-100 via-white to-blue-100 py-1 px-1">
      <div className="mx-auto  min-h-screen bg-white rounded-3xl shadow-2xl p-2 space-y-6">
        {/* Header */}
        <div className="relative text-center border-b border-gray-200 pb-2">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight flex justify-center items-center gap-3">
            <span>📊</span> Project Budget Overview
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 hover:scale-105 transition-all duration-200"
          >
            ← Tasks
          </button>
        </div>

        {/* Project Info */}
        <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6 rounded-2xl border border-blue-200 shadow-inner space-y-3">
          <div className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            🏗️ <span>Project Name:</span>{" "}
            <span className="text-blue-600 uppercase">{findProject?.name}</span>
          </div>
          <div className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            💰 <span>Total Budget:</span>{" "}
            <span className="text-green-600 font-bold">
              {findProject?.budget}
            </span>
          </div>
        </div>

        {/* Revenue & Expenses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="bg-white border border-blue-200 rounded-2xl p-2 shadow-lg hover:shadow-2xl transition-all duration-200">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-2xl font-bold justify-center text-blue-700 mb-3 flex items-center gap-2 border-b border-blue-100 pb-2">
                📥 Revenue
              </h2>
              <div className="relative  max-w-xs">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search milestone / Invoice-No"
                  onChange={(e) => setRevenueSearch(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Add Revenue
              </button>
            </div>

            <RevenueBudget
              revenueSearch={revenueSearch}
              projectId={id}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>

          <div className="bg-white border border-red-200 rounded-2xl p-2 shadow-lg hover:shadow-2xl transition-all duration-200">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-2xl font-bold justify-center text-red-600 mb-3 flex items-center gap-2 border-b border-red-100 pb-2">
                📤 Expenses
              </h2>

                            <div className="relative  max-w-xs">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search paidTo / Invoice-No"
                  onChange={(e) => setExpenseSearch(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-800 transition-colors"
              >
                Add Expense
              </button>
            </div>

            <ExpensesBudget
              expenseSearch={expenseSearch}
              projectId={id}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>

        {/* Discussions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/**/}
          <div className="bg-white border border-blue-100 rounded-2xl p-3 shadow-md hover:shadow-lg  transition">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-2xl font-bold justify-center text-red-600 mb-3 flex items-center gap-2 border-b border-red-100 pb-2">
                💬 Client Discussion
              </h2>
              <div className="relative  max-w-xs">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by client / discussed"
                  onChange={(e) => setClientDisSearch(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <button
                onClick={() => setIsRevOpen(true)}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Add Clientdis.
              </button>
            </div>
            <DiscussionRevenue
              projectId={id}
              isRevOpen={isRevOpen}
              setIsRevOpen={setIsRevOpen}
              clientDisSearch={clientDisSearch}
            />
          </div>
          <div className="bg-white border border-red-100 rounded-2xl shadow-md hover:shadow-lg transition">
  {/* 👇 Header Row */}
  <div className="flex items-center justify-between  border-b">
    {/* Title */}
    <h2 className="text-xl font-semibold text-red-600">
      🧾 Expenses Discussion
    </h2>

    {/* Search and Button Container */}
    <div className="flex items-center gap-3">
      {/* Search Input */}
      <div className="relative max-w-xs">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search clientName"
          onChange={(e) => setExpenseDisSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 text-sm"
        />
      </div>

      {/* Add Button */}
      <AddButtonDiscussionExpense />
    </div>
  </div>

  {/* 👇 Table Data Below */}
  <DiscussionExpenses expenseDisSearch={expenseDisSearch} projectId={id} />
</div>

        </div>
      </div>
    </div>
  );
};

export default Budget;

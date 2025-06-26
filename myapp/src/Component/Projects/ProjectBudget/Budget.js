import React, { useEffect, useState } from "react";
import RevenueBudget from "./RevenueBudget";
import ExpensesBudget from "./ExpensesBudget";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { projectlist } from "../../../FeatureRedux/projectlistSlice";
import DiscussionRevenue from "./DiscussionRevenue";
import DiscussionExpenses from "./DiscussionExpenses";
import AddButtonDiscussionExpense from "./addButtonDiscussionExpense";
import { AiOutlineComment } from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdOutlineSavings } from "react-icons/md";
import { LuConstruction } from "react-icons/lu";
import { MdInsights } from "react-icons/md";

const Budget = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRevOpen, setIsRevOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [revenueSearch, setRevenueSearch] = useState("");
  const [expenseSearch, setExpenseSearch] = useState("");
  const [clientDisSearch, setClientDisSearch] = useState("");
  const [expenseDisSearch, setExpenseDisSearch] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projects } = useSelector((state) => state.projectlist);
  const findProject = projects.find((pro) => pro._id === id);

  useEffect(() => {
    dispatch(projectlist({}));
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-tr from-indigo-100 via-white to-blue-100 py-1 px-1">
      <div className="mx-auto h-[820px] bg-white rounded-3xl shadow-2xl p-1 space-y-3">
        {/* Header */}
        <div className="relative text-center border-b border-gray-200 pb-4">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight flex justify-center items-center gap-3">
            <MdInsights className="text-5xl text-purple-700" />
            <span>Project Budget Overview</span>
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
            <LuConstruction className="text-3xl text-yellow-600" />
            <span>Project Name:</span>
            <span className="text-blue-600 uppercase">{findProject?.name}</span>
          </div>

          <div className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <FaMoneyBillWave className="text-3xl text-green-600" />
            <span>Total Budget:</span>
            <span className="text-green-600 font-bold">
              {findProject?.budget}
            </span>
          </div>
        </div>

        {/* Revenue & Expenses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Revenue Section */}
          <div className="bg-white border border-blue-200 rounded-2xl p-2 shadow-lg hover:shadow-2xl transition-all duration-200">
            <div className="flex flex-row justify-between items-center gap-3">
              <h2 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2 border-b border-blue-100 pb-2">
                <MdOutlineSavings className="text-3xl" />
                Revenue
              </h2>

              <div className="flex items-center gap-2 ml-auto">
                <input
                  type="text"
                  value={revenueSearch}
                  onChange={(e) => setRevenueSearch(e.target.value)}
                  placeholder="Search..."
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-800 transition-colors text-sm"
                >
                  Add Revenue
                </button>
              </div>
            </div>

            <RevenueBudget
              projectId={id}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              revenueSearch={revenueSearch}
            />
          </div>

          {/* Expenses Section */}
          <div className="bg-white border border-red-200 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-200">
            <div className="flex flex-row justify-between items-center gap-3">
              <h2 className="text-2xl font-bold text-red-600 mb-3 flex items-center gap-2 border-b border-red-100 pb-2">
                <FaMoneyBillWave className="text-3xl" />
                Expenses
              </h2>

              <div className="flex items-center gap-2 ml-auto">
                <input
                  type="text"
                  value={expenseSearch}
                  onChange={(e) => setExpenseSearch(e.target.value)}
                  placeholder="Search expenses..."
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-800 transition-colors text-sm"
                >
                  Add Expense
                </button>
              </div>
            </div>

            <ExpensesBudget
              projectId={id}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              expenseSearch={expenseSearch}
            />
          </div>
        </div>

        {/* Discussions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Client Discussion */}
          <div className="bg-white border border-blue-100 rounded-2xl p-3 shadow-md hover:shadow-lg transition">
            <div className="flex flex-row justify-between items-center gap-3">
              <h2 className="text-2xl font-bold text-blue-600 mb-3 flex items-center gap-2 border-b border-blue-100 pb-2">
                <AiOutlineComment className="text-3xl" />
                Client Discussion
              </h2>
              <div className="flex items-center gap-2 ml-auto">
                <input
                  type="text"
                  value={clientDisSearch}
                  onChange={(e) => setClientDisSearch(e.target.value)}
                  placeholder="Search client discussion..."
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => setIsRevOpen(true)}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-800 transition-colors text-sm"
                >
                  Add Clientdis.
                </button>
              </div>
            </div>

            <DiscussionRevenue
              projectId={id}
              isRevOpen={isRevOpen}
              setIsRevOpen={setIsRevOpen}
              searchTerm={clientDisSearch}
            />
          </div>

          {/* Expenses Discussion */}
          <div className="bg-white border border-red-100 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="flex justify-between px-4 pt-2 pb-1">
              <h2 className="text-xl font-semibold text-red-600 flex items-center border-b">
                🧾 Expenses Discussion
              </h2>
              <div className="flex items-center gap-2 ml-auto">
                <input
                  type="text"
                  value={expenseDisSearch}
                  onChange={(e) => setExpenseDisSearch(e.target.value)}
                  placeholder="Search expense discussion..."
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <AddButtonDiscussionExpense projectId={id} />
              </div>
            </div>

            <DiscussionExpenses projectId={id} searchTerm={expenseDisSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;

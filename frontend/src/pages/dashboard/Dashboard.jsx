import React from "react";
import {
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiDollarSign,
  FiArrowUpRight,
} from "react-icons/fi";
import StatsCard from "../../components/dashboard/StatsCard";

// 🔥 CHANGE ROLE HERE FOR TESTING
const user = {
  name: "Sarah Johnson",
  role: "admin", // "admin" | "staff" | "customer"
};

const statsData = [
  { title: "Total Products", value: "1,245", icon: FiBox, color: "orange" },
  { title: "Total Orders", value: "560", icon: FiShoppingCart, color: "blue" },
  { title: "Total Users", value: "3,892", icon: FiUsers, color: "green" },
  { title: "Revenue", value: "$48.5K", icon: FiDollarSign, color: "purple" },
];

const recentOrders = [
  {
    id: "ORD-7291",
    customer: "Sarah Johnson",
    amount: "$125.00",
    status: "Completed",
    date: "Oct 24, 2023",
  },
  {
    id: "ORD-7290",
    customer: "Michael Chen",
    amount: "$89.50",
    status: "Pending",
    date: "Oct 24, 2023",
  },
  {
    id: "ORD-7289",
    customer: "Emily Davis",
    amount: "$340.00",
    status: "Completed",
    date: "Oct 23, 2023",
  },
  {
    id: "ORD-7288",
    customer: "James Wilson",
    amount: "$64.99",
    status: "Cancelled",
    date: "Oct 23, 2023",
  },
  {
    id: "ORD-7287",
    customer: "Jessica Martinez",
    amount: "$210.00",
    status: "Pending",
    date: "Oct 22, 2023",
  },
];

const statusStyles = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function Dashboard() {
  // ✅ FILTER STATS BASED ON ROLE
  const filteredStats =
    user.role === "admin"
      ? statsData
      : user.role === "staff"
        ? statsData.filter(
            (s) => s.title === "Total Products" || s.title === "Total Orders",
          )
        : [
            {
              title: "My Orders",
              value: "12",
              icon: FiShoppingCart,
              color: "blue",
            },
            {
              title: "My Spending",
              value: "$320",
              icon: FiDollarSign,
              color: "green",
            },
          ];

  // ✅ FILTER ORDERS
  const displayedOrders =
    user.role === "customer"
      ? recentOrders.filter((o) => o.customer === user.name)
      : recentOrders;

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C3F]">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {user.role === "customer"
              ? "Overview of your activity"
              : "Overview of your store performance"}
          </p>
        </div>

        {/* ADMIN ONLY BUTTON */}
        {user.role === "admin" && (
          <button className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-[#F97316] text-white text-sm font-semibold rounded-xl shadow-md hover:bg-orange-600 transition">
            View Reports
            <FiArrowUpRight />
          </button>
        )}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredStats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-[#0B1C3F]">
              {user.role === "customer" ? "My Orders" : "Recent Orders"}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              {user.role === "customer"
                ? "Your recent purchases"
                : "Latest transactions in your store"}
            </p>
          </div>

          {user.role !== "customer" && (
            <button className="text-sm font-semibold text-[#F97316] hover:text-orange-600 transition">
              View All
            </button>
          )}
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="text-left border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">
                  Order ID
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">
                  Customer
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">
                  Amount
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase text-right">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {displayedOrders.length > 0 ? (
                displayedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-semibold text-[#0B1C3F]">
                      {order.id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0B1C3F] text-white flex items-center justify-center text-xs font-bold">
                          {order.customer.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-700 font-medium">
                          {order.customer}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {order.amount}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500 text-right whitespace-nowrap">
                      {order.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-400 text-sm"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

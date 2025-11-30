import React from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../../components/AdminSidebar";

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-[15%] fixed h-full z-10">
        <AdminSidebar />
      </div>

      <main className="w-[90%] ml-[15%] p-2 transition-all h-[600px] duration-300">
        <div className=" flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Admin</span>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[calc(100vh-8rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

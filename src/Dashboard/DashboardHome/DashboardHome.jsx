import SideMenu from '@/Layouts/SideMenu';
import React from 'react'
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, Outlet } from 'react-router-dom';



const DashboardHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? "w-64" : "w-50"
                    } bg-white border-r border-gray-200 transition-all duration-300`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 h-[8%]">
                    <h1
                        className={`text-lg font-bold transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        Admin
                    </h1>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-gray-500 hover:text-gray-900"
                    >
                        {/* Bar icon */}
                        <FaBars />

                    </button>
                </div>

                {/* Sidebar Menu */}
                <div className='flex flex-col justify-between h-[92%] py-5'>
                    <div>
                        <SideMenu />
                    </div>
                    <nav className='p-4'>
                        <ul>
                            <NavLink className={"font-bold text-black"} to={"my-profile"}>
                                Logout
                            </NavLink>
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 h-[8%] flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Admin Dashboard</h2>
                </header>

                {/* Content Area */}
                <div className='px-5 h-[85%] overflow-auto'>
                    <Outlet />
                </div>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 px-6 h-[7%] text-center flex items-center justify-center">
                    <p className="text-gray-600 text-sm">
                        © 2025 Parcel Mama. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    )
}

export default DashboardHome

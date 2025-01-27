import { authContext } from '@/Contexts/AuthContext/AuthContext';
import SideMenu from '@/Layouts/SideMenu';
import React, { useContext } from 'react'
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, NavLink, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import logoIcon from '../../assets/delivery.png'
import useAdmin from '@/CustomHooks/useAdmin';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const DashboardHome = () => {
    const [isAdmin] = useAdmin()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { userSignOut } = useContext(authContext)
    const {user} = useContext(authContext)

    const {
        data: currentUser = {},
      } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
          const { data } = await axios.get(
            `${import.meta.env.VITE_MAIN_URL}/user/${user?.email}`
          );
    
          return data;
        },
      });

    const handleLogout = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                userSignOut()
            }
        });
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? "w-64" : "w-50"
                    } bg-white border-r border-gray-200 transition-all duration-300`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 h-[8%]">
                    <Link to={'/'}><img className='w-[50px]' src={logoIcon} alt="" /></Link>
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
                            <NavLink onClick={handleLogout} className={"font-bold text-black"}>
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
                    <h2 className="text-xl font-semibold">
                        {currentUser.role === 'admin' && 'Admin Dashboard'}
                        {currentUser.role === 'user' && 'User Dashboard'}
                        {currentUser.role === 'deliveryman' && 'DeliveryMan Dashboard'}
                    </h2>
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

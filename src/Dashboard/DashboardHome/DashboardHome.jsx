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
import { FiLogOut } from "react-icons/fi";


const DashboardHome = () => {
    const [isAdmin] = useAdmin()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { userSignOut } = useContext(authContext)
    const { user } = useContext(authContext)

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
        <div className="flex bg-gray-100 overflow-x-hidden h-screen">
            <aside className={`${isSidebarOpen ? 'translate-x-[0%]' : 'translate-x-[-100%]'} bg-[#ffcc00] border-r border-gray-200 transition-all duration-300 absolute xl:w-[15%] lg:w-[20%] w-[80%] min-h-screen z-10 lg:fixed flex flex-col  h-screen`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 h-[8%]">
                    <Link to={'/'}><img className='w-[50px]' src={logoIcon} alt="" /></Link>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-gray-500 hover:text-gray-900"
                    >
                        <FaBars />

                    </button>
                </div>

                <div className='flex flex-col justify-between h-[92%] py-5'>
                    <div>
                        <SideMenu />
                    </div>
                    <nav className='p-4'>
                        <ul>
                            <NavLink onClick={handleLogout} className={"font-bold text-black"}>
                                <span className='flex items-center gap-3'><FiLogOut /> Logout</span>
                            </NavLink>
                        </ul>
                    </nav>
                </div>
            </aside>

            <div className="flex flex-col w-full">
                <header className="border-b border-gray-200 px-6 h-[8%] flex items-center gap-5">
                    <FaBars onClick={() => setIsSidebarOpen(!isSidebarOpen)} className='text-2xl cursor-pointer' />
                    <h2 className="text-xl font-semibold">
                        {currentUser.role === 'admin' && 'Admin Dashboard'}
                        {currentUser.role === 'user' && 'User Dashboard'}
                        {currentUser.role === 'deliveryman' && 'DeliveryMan Dashboard'}
                    </h2>
                </header>


                <div className={`px-5 h-[85%] ${isSidebarOpen && 'w-[80%] ml-auto'} overflow-auto`}>
                    <Outlet />
                </div>

                <footer className="border-t bg-white border-gray-200 px-6 h-[7%] text-center flex items-center justify-center">
                    <p className="text-gray-600 text-sm">
                        © 2025 Parcel Mama. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    )
}

export default DashboardHome

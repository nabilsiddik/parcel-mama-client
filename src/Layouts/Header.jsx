import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { authContext } from '../Contexts/AuthContext/AuthContext'
import logo from "../assets/delivery.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaBars } from 'react-icons/fa';
import MobileSideMenu from '@/Components/MobileSideMenu/MobileSideMenu';


const Header = () => {

    const { user, userSignOut, darkMode, setDarkMode } = useContext(authContext)
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [mobileMenuActive, setMobileMenuActive] = useState(false)

    // get current user
    const {
        data: currentUserRole = {},
    } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_MAIN_URL}/user/${user?.email}`
            );

            return data.role;
        },
    });


    const handleLogout = () => {
        userSignOut()
    }

    return (
        <header id='header' className='bg-gradient-to-r from-[#fc0] to-[#fc0] shadow-xl py-2 border-b-2 border-gray fixed w-full z-[999]'>
            <MobileSideMenu mobileMenuActive={mobileMenuActive} />
            <div className="container py-5 flex items-center justify-between">

                <Link to={'/'}>
                    <div className="logo ">
                        <a className="text-xl flex items-center gap-4">
                            <img className='w-[60px]' src={logo} alt="" />
                            <div className='ml-[-8px]'>
                                <h3 className='font-bold text-3xl'>PARCEL</h3>
                                <h4 className='font-bold text-2xl mt-[-10px] ml-[10px] text-[#ff3f34] '>mama</h4>
                            </div>
                        </a>
                    </div>
                </Link>

                <nav className="menu hidden sm:block">
                    <ul className='flex items-center gap-5'>
                        <NavLink to={'/'} className={'text-xl'}>Home</NavLink>
                        {user?.email && <NavLink to={'/dashboard'} className={'text-xl w-full block rounded-lg'}>Dashboard</NavLink>}
                    </ul>
                </nav>

                <div className="mobile_side_menu cursor-pointer sm:hidden">
                    <FaBars onClick={() => setMobileMenuActive(!mobileMenuActive)} className='text-3xl' />
                </div>

                <div className='items-center gap-5 hidden sm:flex'>
                    {user?.email ?

                        <div className='relative'>
                            <Avatar onClick={() => setShowProfileMenu(!showProfileMenu)} className='border-4 w-12 h-12 border-red-600 cursor-pointer'>
                                <AvatarImage src={user?.photoURL} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            {showProfileMenu && <div className='w-[300px] h-[300px] bg-red-600 absolute top-full right-0 rounded-lg py-6 px-4'>
                                <h3 className=' text-white'>Hey, {user?.displayName}</h3>
                                <nav className=' text-white mt-5'>
                                    {user?.email && <NavLink to={'/dashboard'} className={'text-xl bg-red-700 w-full block p-3 rounded-lg mb-3'}>Dashboard</NavLink>}
                                    {user?.email && <NavLink to={'/dashboard/my-profile'} className={'text-xl bg-red-700 w-full block p-3 rounded-lg'}>Profile</NavLink>}
                                </nav>
                                <Button onClick={handleLogout} className='bg-yellow-500 text-black mt-5 text-lg py-6 hover:bg-yellow-600 w-full'>Logout</Button>
                            </div>}
                        </div>

                        :
                        <div>
                            <Link to={'/authentication/login'}>
                                <Button className='bg-red-600 text-white text-lg py-6 px-8 hover:bg-red-700'>Login</Button>
                            </Link>
                        </div>
                    }

                    <div className='relative'>
                        <MdOutlineNotificationsActive className='text-4xl text-red-600' />
                        <div className='w-[20px] h-[20px] bg-black text-white flex items-center justify-center rounded-full absolute top-[-18px] right-[-6px] text-sm'>0</div>
                    </div>

                </div>


            </div>
        </header>
    )
}

export default Header

import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { authContext } from '../Contexts/AuthContext/AuthContext'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

import logo from "../assets/delivery.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MdOutlineNotificationsActive } from "react-icons/md";


import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const Header = () => {

    const { user, userSignOut, darkMode, setDarkMode } = useContext(authContext)
    const [showProfileMenu, setShowProfileMenu] = useState(false)

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

    // const mobileMenu =
    //     <nav className="header_menu">
    //         <ul
    //             tabIndex={0}
    //             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow  dark:bg-red-600">
    //             <li><NavLink to={'/'}>Home</NavLink></li>
    //             {user?.email && <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>}
    //         </ul>
    //     </nav>

    // const mainMenu = <nav className="header_menu">
    //     <ul
    //         tabIndex={0}
    //         className="menu menu-horizontal px-1">
    //         <li><NavLink className={'text-white text-md'} to={'/'}>Home</NavLink></li>
    //         {user?.email && <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>}
    //     </ul>
    // </nav>

    return (
        <header id='header' className='bg-gradient-to-r from-[#fc0] to-[#fc0] shadow-xl py-2 border-b-2 border-gray fixed w-full z-[99999]'>
            <div className="container py-3 flex items-center justify-between">
                {/* <div className="navbar flex flex-col md:flex-row gap-4">
                    <div className="navbar-start flex justify-center">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn text-white btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            {mobileMenu}
                        </div>
                        <a className="text-xl flex items-center gap-3">
                            <img className='w-[60px]' src={logo} alt="" />
                            <div className='ml-[-8px]'>
                                <h3 className='font-bold text-4xl'>PARCEL</h3>
                                <h4 className='font-bold text-3xl mt-[-10px] ml-[10px] text-[#ff3f34] '>mama</h4>
                            </div>
                        </a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        {mainMenu}
                    </div>
                    <div className="navbar-end flex flex-col gap-3 sm:flex-row justify-center">
                        {user?.email ?
                            <div className='flex items-center gap-5'>
                                <button onClick={handleLogout} className='btn'>Sign Out</button>
                                <div className="tooltip tooltip-bottom" data-tip={user?.email && user.displayName}>
                                    <div className="avatar">
                                        <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                                            <img src={user?.photoURL} alt="profile" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <Link to={'/authentication/login'}><button className='btn'>Sign In</button></Link>
                        }

                        <div className="dark_light_mode flex items-center gap-3 text-3xl ml-5">
                            <MdDarkMode onClick={() => setDarkMode(true)} className='cursor-pointer' />
                            <MdLightMode onClick={() => setDarkMode(false)} className='cursor-pointer' />
                        </div>
                    </div>
                </div> */}

                <div className="logo">
                    <a className="text-xl flex items-center gap-3">
                        <img className='w-[60px]' src={logo} alt="" />
                        <div className='ml-[-8px]'>
                            <h3 className='font-bold text-4xl'>PARCEL</h3>
                            <h4 className='font-bold text-3xl mt-[-10px] ml-[10px] text-[#ff3f34] '>mama</h4>
                        </div>
                    </a>
                </div>

                <nav className="menu">
                    <ul className='flex items-center gap-5'>
                        <NavLink to={'/'} className={'text-xl'}>Home</NavLink>
                        {user?.email && <NavLink to={'/dashboard'} className={'text-xl w-full block rounded-lg'}>Dashboard</NavLink>}
                    </ul>
                </nav>

                <div className='flex items-center gap-5'>
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

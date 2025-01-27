import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from "../../assets/delivery.png"
import { authContext } from '@/Contexts/AuthContext/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MdOutlineNotificationsActive } from "react-icons/md";

const MobileSideMenu = ({ mobileMenuActive }) => {

    const { user, userSignOut } = useContext(authContext)


    const handleLogout = () => {
        userSignOut()
    }

    return (
        <div id='mobile_menu' className={`z-[99999] absolute top-full shadow-xl bg-yellow-500 min-h-screen py-5 w-10/12 transition-all duration-1000 ${mobileMenuActive ? 'translate-x-[0%]' : 'translate-x-[-100%]'}`}>
            {user?.email &&
                <div className='px-5 mb-8 '>
                    <div className='flex items-center gap-3'>
                        <div>
                            <Avatar className='border-4 w-12 h-12 border-red-600 cursor-pointer'>
                                <AvatarImage src={user?.photoURL} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <h3>Hey, {user?.displayName}</h3>
                            <p>{user?.email}</p>
                        </div>
                    </div>

                    <Button onClick={handleLogout} className='mt-4 bg-red-600 py-5 px-8'>Logout</Button>
                </div>
            }
            <nav>
                <ul className='flex flex-col gap-3'>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/dashboard'} className='px-3'>Dashboard</NavLink>
                    {!user?.email && <NavLink to={'/authentication/login'} className='px-3'>Login</NavLink>}
                </ul>
            </nav>
        </div>
    )
}

export default MobileSideMenu

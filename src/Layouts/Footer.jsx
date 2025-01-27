import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import logo from '../assets/delivery.png'
import stripeLogo from '../assets/Stripe.png'

const Footer = () => {
    return (
        <footer id='footer' className='bg-[#fc0] pt-10'>
            <div className="container footer pt-10 text-lg text-black">
                <div>
                    <div className="logo ">
                        <a className="text-xl flex items-center gap-4">
                            <img className='w-[60px]' src={logo} alt="" />
                            <div className='ml-[-8px]'>
                                <h3 className='font-bold text-3xl'>PARCEL</h3>
                                <h4 className='font-bold text-2xl mt-[-10px] ml-[10px] text-[#ff3f34] '>mama</h4>
                            </div>
                        </a>
                    </div>
                    <img src={''} alt="" />
                    <p>Parcel Mama is the number one <br></br> parcel delivery service in Bangladesh</p>
                </div>
                <nav>
                    <h6 className="footer-title">Quick Links</h6>
                    <NavLink to={'/'}>Customer Service</NavLink>
                    <NavLink to={'/'}>Developar Portal</NavLink>
                </nav>

                <div>
                    <h6 className="footer-title">Social Links</h6>
                    <ul className="mt-5 flex items-center gap-3 text-lg">
                        <li className='w-[30px] h-[30px] flex items-center justify-center bg-white rounded-full text-black'><a href="https://www.facebook.com/codewithnabil"><FaFacebookF />
                        </a></li>
                        <li className='w-[30px] h-[30px] flex items-center justify-center bg-white rounded-full text-black'><a href="https://www.linkedin.com/in/nabilsiddik/"><FaLinkedinIn />
                        </a></li>
                        <li className='w-[30px] h-[30px] flex items-center justify-center bg-white rounded-full text-black'><a href="https://www.linkedin.com/in/nabilsiddik/"><BsTwitterX />
                        </a></li>
                        <li className='w-[30px] h-[30px] flex items-center justify-center bg-white rounded-full text-black'><a href="https://www.linkedin.com/in/nabilsiddik/"><FaYoutube />
                        </a></li>
                    </ul>
                </div>
            </div>

            <div className='bg-yellow-500 py-10 mt-10'>
                <div className="container flex items-center justify-between">
                    <p className='text-center font-bold'>&copy; All right reserved 2025  Parcel Mama</p>
                    <img className='w-[100px]' src={stripeLogo} alt="" />
                </div>
            </div>
        </footer>
    )
}

export default Footer

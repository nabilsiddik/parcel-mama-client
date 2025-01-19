import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer id='footer' className='bg-black py-10'>
            <div className="container footer text-neutral-content p-10">
                <nav>
                    <img src={''} alt="" />
                    <p>Leargest Tutor finding website <br /> in the world.</p>
                </nav>
                <nav>
                    <h6 className="footer-title">Important Links</h6>
                    <li><NavLink to={'/find-tutors'}>Find Tutors</NavLink></li>
                    <li><NavLink to={'/my-tutorials'}>My Tutorials</NavLink></li>
                    <li><NavLink to={'/my-booked-tutors'}>My Booked Tutors</NavLink></li>
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
        </footer>
    )
}

export default Footer

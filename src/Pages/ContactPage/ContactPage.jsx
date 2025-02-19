import IconList from '@/Components/IconList/IconList'
import React from 'react'
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa'
import { FaLocationDot } from "react-icons/fa6";

const ContactPage = () => {
  return (
    <div id='contact_page'>
      <div id='contact' className='pt-[200px] pb-20'>
            <div className="container">

                <div className="flex md:flex-row items-stretch gap-10 flex-col">
                    <div className='border py-16 px-3 md:px-5 lg:px-20 rounded-lg w-full md:w-6/12'>
                        <div className='flex h-full justify-center flex-col'>
                            <div className='mb-10 border-b'>
                                <IconList icon={<FaEnvelope/>
                                } title='Email' text='nabilsiddik90@gmail.com' />
                            </div>
                            <div className="mb-10 border-b">
                                <IconList icon={<FaWhatsapp />
                                } title='Phone / Whatsapp' text='+8801957282230' />
                            </div>
                            <div className="border-b-0">
                                <IconList icon={<FaLocationDot />
                                } title='Address' text='Dhaka Bangladesh' />
                            </div>
                        </div>
                    </div>

                    <div className="contact-form w-full md:w-6/12 border py-5 px-5 rounded-lg">
                        <form>
                            <div className="input-gorup">
                                <div className='flex items-center gap-5'>
                                    <div className='w-6/12'>
                                        <label className='label  mb-1 text-md block' htmlFor="first name">First Name</label>
                                        <input type="text" className='input input-bordered py-6 border w-full' placeholder='First Name' />
                                    </div>

                                    <div className='w-6/12'>
                                        <label className='label  mb-1 text-md block' htmlFor="first name">Last Name</label>
                                        <input type="text" className='input input-bordered py-6 border w-full' placeholder='Last Name' />
                                    </div>
                                </div>
                            </div>



                            <div className='flex items-center gap-5 mt-7'>
                                <div className='w-6/12'>
                                    <label className='label  mb-1 text-md block' htmlFor="email">Email</label>
                                    <input type="email" className='input input-bordered py-6 border w-full' placeholder='Your Email' />
                                </div>

                                <div className='w-6/12'>
                                    <label className='label  mb-1 text-md block' htmlFor="first name">Phone / Whatsapp</label>
                                    <input type="number" className='input input-bordered py-6 border w-full' placeholder='Your Phone / Whatsapp' />
                                </div>
                            </div>

                            <div className="input-group mt-7">
                                <label className='label  mb-1 text-md block' htmlFor="first name">Subject</label>
                                <input type="text" className='input input-bordered py-6 borde w-full' placeholder='Your Phone / Whatsapp' />
                            </div>

                            <div className='mt-7'>
                                <label className='label  mb-1 text-md block' htmlFor="first name">Message</label>
                                <textarea rows={5} className='textarea textarea-bordered w-full borde' placeholder='Write Your Message ...'></textarea>
                            </div>

                            <div>
                                <input type="submit" value={'Submit'} className='btn bg-red-600 text-white text-lg hover:bg-red-600 w-full mt-5' />
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default ContactPage

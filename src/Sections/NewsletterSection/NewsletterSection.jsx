import Lottie from 'lottie-react'
import React from 'react'
import newsletterLottie from '../../assets/lotties/newsletter.json'
import { FaApple, FaGooglePlay } from 'react-icons/fa'

const NewsletterSection = () => {
    return (
        <section id='newsletter_section' className='bg-yellow-400 my-20'>
            <div className="container">
                <div className="flex items-center justify-center">
                    <div>
                        <Lottie className='w-[350px]' animationData={newsletterLottie}></Lottie>
                    </div>
                    <div>
                        <h3 className='text-4xl'>Subscribe Our Newsletter</h3>
                        <p className='my-3 w-11/12 md:w-10/12 lg:w-[8/12]'>Subscribe our newsletter to get regular update and offers about our deliver services.</p>
                        <form className='flex items-stretch'>
                            <input type="email" className='input input-bordered rounded-r-none' placeholder='Your Email' />
                            <input type="submit" className='btn bg-red-600 border-2 border-red-600 hover:text-red-600 text-white hover:bg-[transparent] rounded-l-none hover:border-red-600' value='Subscribe'/>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewsletterSection

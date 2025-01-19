import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/Components/ui/button'


const BannerSection = () => {
    return (
        <section id='banner_section' className='relative'>
            <div className="absolute inset-0 bg-black bg-opacity-60 z-10">
                
            </div>
            <div className="relative container flex items-center justify-center h-[800px] z-20">
                    <div className='text-white'>
                        <h1 className='text-center mb-5'>Parcel Mama - No. 1 <br />Parcel Delivery Service in Bangladesh</h1>
                        <form className='w-11/12 md:w-8/12 lg:w-6/12 mx-auto'>
                            <div className="flex w-full max-w-sm items-center space-x-1 mx-auto">
                                <Input className='py-7 custom-input' type="email" placeholder="Tracking Number" />
                                <Button variant = "destructive" type="submit" className='py-7'>Track Now</Button>
                            </div>
                        </form>
                    </div>
                </div>
        </section>
    )
}

export default BannerSection

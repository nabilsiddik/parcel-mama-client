import SectionHeader from '@/Components/SectionHeader/SectionHeader'
import { faqs } from '@/Data/faq'
import React from 'react'
import faqLottie from '../../assets/lotties/ask.json'
import Lottie from 'lottie-react'

const FaqSection = () => {
    return (
        <div id='faq_section' className='my-20'>
            <div className="container">
                <SectionHeader title={'FAQ'} description={'Here are some of the frequently asked questions that may be coming to your mind.'} />

                <div className='flex items-center'>
                    <div className='flex-1'>
                        <Lottie animationData={faqLottie}/>
                    </div>
                    <div className='flex-1'>
                        {faqs.length > 0 && faqs.map((faq) => {
                            return <div key={faq.id} className="collapse collapse-plus bg-base-200 mb-3 border border-yellow-500">
                                <input type="radio" name="my-accordion-3" defaultChecked />
                                <div className="collapse-title text-xl font-medium">{faq.question}</div>
                                <div className="collapse-content">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FaqSection

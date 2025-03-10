import React from "react";
import Lottie from "lottie-react";
import deliveryBoy from "../../assets/lotties/delivery-boy.json";
import deliveryBoy1 from "../../assets/lotties/delivery-man-calling-customer.json";
import deliveryBoy2 from "../../assets/lotties/online-delivery-service.json";
import { Button } from "@headlessui/react";
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const BannerSection = () => {
  return (
    <section id="banner_section" className="h-[800px] flex items-center pt-10">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center md:text-left">
            <Fade>
              <h1 className=" mb-5 text-3xl md:text-5xl lg:text-5xl">
                Fast & Reliable Parcel Delivery
              </h1>
              <p className="w-11/12 md:w-8/12 mx-auto md:mx-0">
                Parcel Mama deliver fast and secure delivery and always believe
                in customer satisfection.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-5 mt-5">
                <Link to={'https://play.google.com'}>
                  <button className="btn bg-red-600 border-2 border-red-600 hover:text-red-600 text-white hover:bg-[transparent] hover:border-red-600">
                    Download App <FaGooglePlay />
                  </button>
                </Link>
                <Link to={'https://www.apple.com/app-store/'}>
                <button className="btn bg-[transparent] border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600">
                  Download App <FaApple />
                </button>
                </Link>
              </div>
            </Fade>
          </div>
          <div className="flex-1 hidden md:block">
            <Lottie animationData={deliveryBoy2} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;

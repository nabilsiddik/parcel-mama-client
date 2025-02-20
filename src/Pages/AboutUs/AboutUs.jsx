import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import { MdSupportAgent } from "react-icons/md";

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen pt-[130px]">
      <section className="text-black  text-center my-20">
        <div className="container">
          <h1 className="text-4xl font-bold">About Parcel Mama</h1>
          <p className="mt-4 text-lg w-11/12 md:w-8/12 lg:w-6/12 mx-auto">
            At Parcel Mama, we specialize in fast, secure, and reliable parcel
            delivery to ensure that your packages reach their destination safely
            and on time. Whether you’re sending documents, gifts, or e-commerce
            orders, we provide a seamless experience with real-time tracking and
            dedicated customer support.
          </p>
        </div>
      </section>

      <section className="bg-gray-100 mx-auto my-16 px-6 text-center py-20">
        <div className="container">
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Our Mission</h1>
            <p className="mt-4 text-lg w-11/12 md:w-8/12 lg:w-6/12 mx-auto">
              At Parcel Mama, we aim to simplify parcel delivery by providing a
              seamless, secure, and efficient experience for all our customers.
              give more details on it
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white my-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-black">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-yellow-400 rounded-lg">
              <div className="flex justify-center mb-5 text-4xl text-red-600">
                <FaShippingFast />
              </div>
              <h3 className="text-2xl mb-3 font-bold">Fast Delivery</h3>
              <p className="text-lg">
                We ensure quick and on-time parcel delivery.
              </p>
            </div>

            <div className="p-6 bg-yellow-400 rounded-lg">
              <div className="flex justify-center mb-5 text-4xl text-red-600">
                <GrSecure />
              </div>
              <h3 className="text-2xl mb-3 font-bold">Secure Handling</h3>
              <p className="text-lg">
                Your parcels are handled with utmost care and security.
              </p>
            </div>

            <div className="p-6 bg-yellow-400 rounded-lg">
              <div className="flex justify-center mb-5 text-4xl text-red-600">
                <MdSupportAgent />
              </div>
              <h3 className="text-2xl mb-3 font-bold">Customer Support</h3>
              <p className="text-lg">
                We offer 24/7 support to assist you anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

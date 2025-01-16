import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext/AuthContext";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { imageUpload } from "../../api/utils";

const Registration = () => {
  const { createUser, signInWithGoogle } = useContext(authContext);

  // Registration
  const handleRegistration = async (e) => {
    e.preventDefault();

    // Collecting form data
    const form = e.target;
    const name = form.name.value;
    const password = form.password.value;
    const email = form.email.value;
    const image = form.image.files[0]
    const role = form.role.value

    const imageUrl = await imageUpload(image)
    createUser(email, password, name, imageUrl)

    await axios.post(`${import.meta.env.VITE_MAIN_URL}/users/${email}`, {
      name,
      email,
      image: imageUrl,
      role,
    });
  }

  return (
    <div id="registration">
      <div className="container py-10">
        <h1 className="text-center mb-10">Registration</h1>

        <div className="flex justify-center">
          <button onClick={() => signInWithGoogle()} className="btn btn-lg">
            <FaGoogle />
            Signup In Google
          </button>
        </div>

        <p className="text-center mt-6 text-lg font-bold">or</p>

        <form
          onSubmit={handleRegistration}
          className="card-body w-11/12 md:w-8/12 lg:w-6/12 mx-auto"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Name<span className="text-red-600"> *</span>
              </span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="name"
              className="input input-bordered"
            />
          </div>
          {/* <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL <span className='text-red-600'> *</span></span>
                        </label>
                        <input name='photoUrl' type="text" placeholder="Photo URL" className="input input-bordered" />
                    </div> */}

          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Photo URL <span className="text-red-600"> *</span>
              </span>
            </label>
            <input name="image" type="file" accept="image/*" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Email <span className="text-red-600"> *</span>
              </span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Password <span className="text-red-600"> *</span>
              </span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="password"
              className="input input-bordered"
            />
          </div>

          <select name="role" className="select select-bordered">
            <option value="user" selected>User</option>
            <option value="deliveryman">Delivery Man</option>
          </select>
          
          <label className="label block">
            Already have an account?{" "}
            <Link className="underline" to="/login">
              Login Now
            </Link>
          </label>
          <div className="form-control mt-6">
            <button className="btn text-xl bg-primary hover:bg-hover text-white ">
              Registration
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;

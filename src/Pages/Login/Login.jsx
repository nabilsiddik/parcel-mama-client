import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from './../../Contexts/AuthContext/AuthContext';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {

    const { signIn, signInWithGoogle } = useContext(authContext)

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        signIn(email, password)
    }

    return (
        <div id='login_page'>
            <div className="container py-10">
                <h1 className='text-center mb-10'>Login</h1>

                <div className='flex justify-center'>
                    <button onClick={() => signInWithGoogle()} className='btn btn-lg'><FaGoogle />Sign In Google
                    </button>
                </div>

                <p className='text-center mt-6 text-lg font-bold'>or</p>


                <form onSubmit={handleLogin} className="card-body w-11/12 md:w-8/12 lg:w-6/12 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <span href="#" className="label-text-alt">Don't have an account? <Link to={'/registration'} className='underline'>Register Now</Link></span>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-primary text-white">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login

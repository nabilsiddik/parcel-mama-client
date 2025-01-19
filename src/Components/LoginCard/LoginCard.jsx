import React, { useContext } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { authContext } from '@/Contexts/AuthContext/AuthContext';


const LoginCard = () => {

    const { signIn, signInWithGoogle } = useContext(authContext)

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        signIn(email, password)
    }

    return (
        <div>
            <CardContent>
                <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    Enter Your Email and Password to Sign In
                </p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <Input
                            name='email'
                            type="email"
                            placeholder="name@example.com"
                            className="w-full mb-3 py-6"
                        />
                        <Input
                            name='password'
                            type="password"
                            placeholder="Password"
                            className="w-full py-6"
                        />
                    </div>
                    <Button className="w-full bg-black text-white">Sign In with Email</Button>
                </form>
                <div className="my-4 text-center text-sm text-gray-600">OR CONTINUE WITH</div>
                <Button onClick={() => signInWithGoogle()} className="py-6 w-full border bg-white border-gray-300 text-black text-lg flex items-center justify-center hover:bg-white">
                    <span className="mr-2"><FcGoogle /></span> Google
                </Button>
            </CardContent>
            <CardFooter className="text-center text-sm text-gray-500 block">
                <label className="label block">
                    <span href="#" className="label-text-alt">Don't have an account? <Link to={'/registration'} className='underline'>Register Now</Link></span>
                </label>
            </CardFooter>
        </div>
    )
}

export default LoginCard

import { authContext } from '@/Contexts/AuthContext/AuthContext';
import React, { useContext, useState } from 'react'
import {
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from 'axios';
import { imageUpload } from '@/api/utils';


const RegistrationCard = () => {

    const { createUser, signInWithGoogle } = useContext(authContext);
    const [role, setRole] = useState('')

    const handleRoleChange = (value) => {
        setRole(value)
    }

    // Registration
    const handleRegistration = async (e) => {
        e.preventDefault();

        // Collecting form data
        const form = e.target;
        const name = form.name.value;
        const password = form.password.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const image = form.image.files[0]

        const imageUrl = await imageUpload(image)
        createUser(email, password, name, imageUrl)

        await axios.post(`${import.meta.env.VITE_MAIN_URL}/users/${email}`, {
            name,
            email,
            phone,
            image: imageUrl,
            role,
        });
    }

    return (
        <div>
            <CardContent>
                <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    Enter Required Information for Create an Account
                </p>
                <form onSubmit={handleRegistration} className="space-y-4">
                    <div>
                        <Input
                            name='name'
                            type="text"
                            placeholder="Your Name"
                            className="w-full mb-3 py-6"
                        />
                        <Input
                            name='email'
                            type="email"
                            placeholder="name@example.com"
                            className="w-full mb-3 py-6"
                        />
                        <Input
                            name='phone'
                            type="tel"
                            placeholder="+8801890987765"
                            className="w-full mb-3 py-6"
                        />
                        <Input
                            name='password'
                            type="password"
                            placeholder="Password"
                            className="w-full py-6 mb-3"
                        />
                        <Input
                            name='image'
                            type="file"
                            accept="image/*"
                            className='pt-5 pb-10 cursor-pointer'
                        />

                        <Select value={role} onValueChange={handleRoleChange} className='role'>
                            <SelectTrigger className="w-full mt-3 py-6">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="deliveryman">Delivery Man</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                    <Button className="w-full bg-black text-white py-6">Create Account</Button>
                </form>
                <div className="my-4 text-center text-sm text-gray-600">OR CONTINUE WITH</div>
                <Button onClick={() => signInWithGoogle()} className="py-6 w-full border bg-white border-gray-300 text-black text-lg flex items-center justify-center hover:bg-white">
                    <span className="mr-2"><FcGoogle /></span> Google
                </Button>
            </CardContent>
            <CardFooter className="text-center text-sm text-gray-500 block">
                <label className="label block">
                    <span href="#" className="label-text-alt">Already have an account? <Link to={'/authentication/login'} className='underline'>login</Link></span>
                </label>
            </CardFooter>
        </div>
    )
}

export default RegistrationCard

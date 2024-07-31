import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from "../store/authSlice"
import { Logo, Input, Button } from "./index.js"
import { useDispatch } from 'react-redux'
import authService from "../appwrite/auth.js"
import { useForm } from 'react-hook-form'



function Signup() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()

    const create = async (data) => {
        setError("")
        try {

            console.log(data)

            const userData = await authService.createAccount(data)

            console.log(userData)

            if (userData) {
                const userData_ = await authService.getCurrentUser();

                console.log(`the user data from getCurrentUser is : ${userData_}`);

                if (userData_) dispatch(login(userData_));

                navigate("/")
            }

        } catch (error) {
            setError(error.message)
        }

    }

  return (
    <div className="flex items-center justify-center mx-4 sm:mx-8 lg:mx-16">
        <div className="w-full max-w-md bg-gray-100 rounded-xl p-6 border border-gray-300 sm:p-8 lg:p-10">
            <div className="mb-4 flex justify-center">
                    <span className="inline-block w-24 sm:w-32 lg:w-40">
                        <Logo width="100%" />
                    </span>
            </div>
            <h2 className="text-center text-black text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">Sign up to create account
            </h2>
            <p className="mt-2 text-center text-sm sm:text-base text-black/60 mb-5">
                    Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Log In
                </Link>
            </p>

            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-4'>

                    <Input
                        label="Full Name : "
                        labelClassName="text-black"
                        placeholder="Enter your Full name"
                        {...register("name",{
                            required: true
                        })}
                    />

                    <Input
                        label="Email : "
                        labelClassName="text-black"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email",{
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                    />  

                    <Input 
                        label="Password : "
                        labelClassName="text-black"
                        placeholder="Enter your password"
                        type="password"
                        {...register("password",{
                            required: true
                        })}

                    />

                    <Button 
                    type='submit' 
                    className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 sm:px-5 sm:py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                    >
                    Create Account
                    </Button>
                    
                </div>
            </form>
        </div>

    </div>
  )
}

export default Signup
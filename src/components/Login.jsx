import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from "../store/authSlice"
import { Logo, Input, Button } from "./index.js"
import { useDispatch } from 'react-redux'
import authService from "../appwrite/auth.js"
import { useForm } from 'react-hook-form'


function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async (data)=>{
        setError("")

        console.log("login is running")


        try {
            const session = await authService.login(data)

            if (session) {
                
                const userData = await authService.getCurrentUser()

                if (userData) dispatch(authLogin({ userData }));

                navigate("/all-posts")
            }
        } 
        catch (error) {
            console.log(error)
            setError(error)
        }
    }



  return (
    <div className='flex items-center justify-center mx-6'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width='100%' />
                </span>
            </div>
            <h2 className="text-center text-black text-2xl font-bold leading-tight">Log in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                Sign Up
                </Link>
            </p>
            { error && <p className="text-red-600 mt-8 text-center">{error}</p> }
            <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>

                 {/* Email input */}
                <Input 
                label="Email : "
                labelClassName="text-black"
                type="email" 
                placeholder='Enter your email'
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />

                {/* password input */}
                <Input 
                label="Password : "
                labelClassName="text-black"
                type="password" 
                placeholder='Enter your password'
                {...register("password",{
                    required: true
                })}
                />

                <Button
                type='submit'
                className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                >
                    Log in
                </Button>

            </div>
            </form>

        </div>
    </div>
  )
}

export default Login
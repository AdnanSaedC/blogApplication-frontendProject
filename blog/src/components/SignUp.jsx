import React, { useState } from 'react'
import service from '../appwrite/configuration.js'
import { data, Link,useNavigate } from 'react-router-dom'
import { login } from '../store/auth.js'
import {Button,InputBox,Logo} from "./index.js"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from "../appwrite/auth.js"


function SignUp() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error,setError] = useState("")
    const {register,handleSubmit}=useForm()

    const createAccount = async(data)=>{
        console.log(data)
        setError("")
        try {
            const session = await authService.createAccount(data)

            if(session){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(login(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex justify-center items-center min-h-screen'>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="text-center">
                <span className="block mb-4">
                    <Logo width='100%'/>
                    <h2 className='text-2xl text-black'>Sign up to create an account</h2>
                    <p className="w-full mt-2">
                        <Link to="/login" className='w-full text-blue-500 hover:underline'>
                            Sign In
                        </Link>
                    </p>
                    {
                        error && <p>{error}</p>
                    }
                </span>
            </div>
            <form onSubmit={handleSubmit(createAccount)}>
                <div className="space-y-4">
                    <InputBox
                       label="Full name: "
                       placeholder="Enter your full name"
                       {...register("name",{
                            required:true
                       })}
                    />

                    <InputBox
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        // now comes react-hook-form
                        {...register( "email",{
                            required:true,
                            validate:{
                                matchPatern:(inputValue)=> /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inputValue) || "Please provide a valid Email address"
                            }
                        })} //register is an objcet and the parameter is taken for name field
                    />

                    <InputBox
                        label="Password: "
                        placeholder="Enter your password"
                        type="password"
                        {...register("password",{
                            required:true
                        })}
                    />

                    <Button
                        type="submit"
                        className
                    >
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp
import React, { useState } from 'react'
import service from '../appwrite/configuration.js'
import { data, Link,useNavigate } from 'react-router-dom'
import { login } from '../store/auth.js'
import {Button,Input,Logo} from "./index.js"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from "../appwrite/auth.js"


function SignUp() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error,setError] = useState("")
    const {register,handleSubmit}=useForm()

    const createAccount = async(data)=>{
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
    <div className=''>
        <div className="">
            <div className="">
                <span className="">
                    <Logo width='100%'/>
                    <h2 className=''>Sign up to create an account</h2>
                    <p className="">
                        <Link to="/login" className=''>
                            Sign In
                        </Link>
                    </p>
                    {
                        error && <p>{error}</p>
                    }
                </span>
            </div>
            <form onSubmit={handleSubmit(createAccount)}>
                <div className="">
                    <Input
                       label="Full name: "
                       placeholder="Enter your full name"
                       {...register("name",{
                            required:true
                       })}
                    />

                    <Input
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

                    <Input
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
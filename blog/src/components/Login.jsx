import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import {login as authLogin} from "../store/auth.js"
import {Button,Logo,Input} from "../components/index.js"
import { useDispatch } from 'react-redux'
import service from "../appwrite/configuration.js"
import {useForm} from "react-hook-form"
import authService from '../appwrite/auth.js'

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register,handleSubmit} = useForm()
    // register tells react-hook-form that an input exists, tracks its value, and attaches validation rules.
    // handleSubmit gathers all registered values, runs their validations, and only then calls the submit function.

    // basically regiter is ysed to link the inout field and apply thevalidation rules
    // handle submit is hook whose job is to collect values from input fields run valdation check and then if evrything is ok call the function which was there to submit the form

    const [error,setError] = useState("")

    const login = async (data)=>{
        setError("")
        try {
            const session = await authService.login(data)

            if(session){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(authLogin(userData))
                    // now you are logged in and i want to redirect
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
        className='flex items-center justify-center h-screen w-full'
    >
        <div className="mx-auto w-full max-w-lg bg-gray-100 p-10  border border-black/10 rounded-xl">
            <div className="mb-2 flex justify-center">
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%'/>
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                New user? <Link to="/signup" className='text-blue-600 text-primary transition-all duration-200 font-medium hover:underline'>Create an account</Link>
            </p>
            { error && 
                <p className='text-red-500 text-center'>{error}</p>
            } 

            {/* now creating a form */}
            <form onSubmit={handleSubmit(login)}
            className='mt-8'
            >
                <div className="space-y-5">
                    <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        // now comes react-hook-form
                        {...register("email",{
                            required:true,
                            validate:{
                                matchPatern:(inputValue)=> /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inputValue) || "Please provide a valid Email address"
                            }
                        })} //register is an objcet and the parameter is taken for name field
                    />
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        {...register("password",{
                            required:true
                        })}
                    />
                    <Button 
                        type="submit"
                        className="w-full"
                    >
                        Sign in
                        {/* this is another way of writing the components */}
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
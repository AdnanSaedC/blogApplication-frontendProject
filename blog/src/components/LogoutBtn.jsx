import React, { use } from 'react'
import {logout} from "../store/auth.js"
import {useDispatch} from "react-redux"
import authService from '../appwrite/auth.js'
import { useNavigate } from 'react-router-dom'


function LogoutBtn() {
  const navigate = useNavigate()

    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        authService.logout().then( ()=>{ 
          dispatch(logout())
          navigate("/login")
        } )
        console.log("logout successfully")
        //redirect to home page
        
    }

  return (
    <button onClick={logoutHandler} className='inline-block px-5 py-2 text-sm font-medium text-rose-400 transition-all duration-300 hover:text-white hover:bg-rose-500/80 rounded-full'
    >
        Logout
    </button>
  )
}

export default LogoutBtn
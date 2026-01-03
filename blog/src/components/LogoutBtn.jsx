import React from 'react'
import {logout} from "../store/auth.js"
import {useDispatch} from "react-redux"
import authService from '../appwrite/auth.js'

function LogoutBtn() {

    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        authService.logout().then( ()=> dispatch(logout) )
    }

  return (
    <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-400 rounded-full'>
        Logout
    </button>
  )
}

export default LogoutBtn
import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

export default function Protected({children,authentication = true}) {
  
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector(state.auth.status)

    useEffect(()=>{

        if(authentication && authStatus !== authentication){
            // idk about this we will rewrite the basic thing is if the state of the user is false dont redirect him
            // i will explain once routing is done
            navigate("/login")
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus,navigate,authentication])

    return (
    loader ? <h1>Loading</h1> : <>{children}</>
  )
}
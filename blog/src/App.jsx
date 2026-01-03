import './App.css'
import React,{useState,useEffect} from 'react'
import {useDispatch } from 'react-redux'
import authService from './appwrite/auth.js'
import { login,logout } from './store/auth.js'
import { Footer,Header} from './components/index.js'
import {Outlet} from "react-router-dom"


function App() {
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
      // we are checking whether the user is logged in or not
      authService.getCurrentUser()
      .then(
        (userDate)=>{
          if(userDate){
            dispatch(login({userDate}))
          }
          else{
            dispatch(logout())
          }
        }
      )
      .finally(()=> setLoading(false))
    },[])


    return loading ? null : (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
  
        {/* Header */}
        <header className="w-full shadow-md shadow-black/30">
          <Header />
        </header>

        {/* Main content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-10">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-gray-700/50 bg-gray-900/60 backdrop-blur-sm">
          <Footer />
        </footer>

    </div>

    )
}

export default App

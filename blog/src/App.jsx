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
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 -z-10 absolute pointer-events-none"></div>
  
        {/* Header */}
        <header className="w-full sticky top-0 z-50 bg-slate-950/70 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/40">
          <Header />
        </header>

        {/* Main content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 flex flex-col">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="w-full mt-auto border-t border-white/5 bg-slate-950/80 backdrop-blur-sm">
          <Footer />
        </footer>

    </div>

    )
}

export default App

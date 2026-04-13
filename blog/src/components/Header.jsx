import React from 'react'
import { Logo , LogoutBtn , Container} from "./index.js"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

  const authStatus = useSelector((state)=>{
    return state.auth.status
  })
  const navigate = useNavigate()

  const navItems=[
    {
      name:"Home",
      slug:"/",
      active:true
    },
    {
      name:"Login",
      slug:"/login",
      active:!authStatus
    },
    {
      name:"Signup",
      slug:"/signup",
      active:!authStatus
    },
    {
      name:"All Post",
      slug:"/all-post",
      active:authStatus
    },
    {
      name:"Add Post",
      slug:"/add-post",
      active:authStatus
    },
  ]

  return (
    <Container>
      <nav className='flex items-center justify-between py-4'>
        <div className="flex items-center">
          <Link to="/" className="group">
            <div className="transform transition-transform duration-300 group-hover:scale-105">
              <Logo width="70px" />  
            </div>
          </Link>
        </div>
        <ul className='flex ml-auto items-center space-x-2 md:space-x-4'>
          {
            navItems.map(
              (eachItem)=>(
                eachItem.active ? (
                <li key={eachItem.name}>
                  <button 
                    onClick={()=> navigate(eachItem.slug)}
                    className='inline-block px-5 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:text-white hover:bg-white/10 rounded-full'
                  >
                    {eachItem.name}
                  </button>
                </li>
                ) : null
              )
            )
          }
          { //this will work only if the first condition is true(which is authStatus)
            authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )
          }
        </ul>
      </nav>
    </Container>
  )
}

export default Header

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout} from './components/index.js'
import AddPost from './components/pages/AddPost.jsx'
import Login from "../src/components/Login.jsx"
import SignUp from "../src/components/SignUp.jsx"
import Home from "../src/components/pages/Home.jsx"
import AllPost from "../src/components/pages/AllPost.jsx"
import Post from "../src/components/pages/Post.jsx"
import EditPost from "../src/components/pages/EditPost.jsx"



const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>, // for single slash run app
    children:[
      {
        index:true, //this means default route of parent
        element:<Home/>
      },
      {
        path:"login",
        element: (
          <AuthLayout authentication={false}>
              <Login/>
          </AuthLayout>
        )
      },
      {
        path:"signup",
        element: (
          <AuthLayout authentication={false}>
              <SignUp/>
          </AuthLayout>
        )
      },
      {
        path:"all-post",
        element: (
          <AuthLayout authentication>{" "}  
          {/* //just to add space */}
              <AllPost/>
          </AuthLayout>
        )
      },
      {
        path:"add-post",
        element: (
          <AuthLayout authentication>{" "}  
          {/* //just to add space */}
              <AddPost/>
          </AuthLayout>
        )
      },
      {
        path:"edit-post/:slug",
        element: (
          <AuthLayout authentication>{" "}  //just to add space
              <EditPost/>
          </AuthLayout>
        )
      },
      {
        path:"/post/:slug",
        element: (
          <AuthLayout authentication>{" "}  //just to add space
              <Post/>
          </AuthLayout>
        )
      },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <RouterProvider router={router}/>
  </Provider>,
)

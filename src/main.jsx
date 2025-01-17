import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Protected } from "./components/index.js"
import Home from "./pages/Home.jsx"
import Signup from './pages/signup.jsx'
import Addpost from "./pages/Addpost.jsx"
import AllPosts from "./pages/AllPosts.jsx"
import EditPost from "./pages/EditPost.jsx"
import Post from "./pages/Post.jsx"
import Login from "./pages/Login.jsx"
import MyPosts from './pages/MyPosts.jsx'




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path:"/login",
        element: (
        <Protected authentication={false}>
          <Login/>
        </Protected>
        )
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup/>
          </Protected>
          )
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            <Addpost/>
          </Protected>
        )
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication>
            <AllPosts />
          </Protected>
        )
      },
      {
        path: "/my-posts",
        element: (
          <Protected authentication>
            <MyPosts />
          </Protected>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication>
            <EditPost />
          </Protected>
        )
      },
      {
        path: "/post/:slug",
        element: <Post/>
      }
    ]
  }
])




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

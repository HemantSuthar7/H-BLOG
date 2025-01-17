import React from 'react'
import { useDispatch } from 'react-redux'
import {logout} from "../../store/authSlice.js"
import { useNavigate } from 'react-router-dom'
import authService from "../../appwrite/auth.js"

function LogoutBtn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        authService.logout().then(()=>{
            dispatch(logout())
            navigate("/")
        })
        .catch((error) => {
            console.log("Error in logout", error)
        })
    }


  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-red-600 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
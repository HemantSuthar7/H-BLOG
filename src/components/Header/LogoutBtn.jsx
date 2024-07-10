import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth.js"
import {logout} from "../../appwrite/auth.js"

function LogoutBtn() {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout()
        .then(()=>{
            dispatch(logout())
        })
        .catch((err)=>{
            console.log(`ERROR !!! While logging Out the user !!! : ${err}`);
        })
    }


  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
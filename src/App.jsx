import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import authService from "./appwrite/auth"
import { useDispatch } from 'react-redux'
import {login, logout} from "./store/authSlice"
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .catch((err)=>{
      console.log("There was an ERROR in fetching the current user from appwrite. The ERROR :",err);
    })
    .finally(()=> setLoading(false))
  },[])

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-zinc-900 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-neutral-900 scrollbar-track-neutral-600 h-32 overflow-y-scroll">
      <div className='w-full block text-white'>
        <Header/>
        <main className="flex-grow">
        <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App

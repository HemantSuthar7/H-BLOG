import React from 'react'
import {Signup as SignupComponent} from "../components"

function signup() {
  console.log("Signup page reached")
  return (
    <div className='py-8'>
        <SignupComponent />
    </div>
  )
}

export default signup
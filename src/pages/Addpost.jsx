import React, {useState} from 'react'
import {Container, PostForm} from "../components/"

function Addpost() {
  return (
    <div className='py-4'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default Addpost
import React from 'react'
import service from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gradient-to-tr from-neutral-900 to-neutral-600 rounded-xl p-4 hover:border-white hover:border-solid hover:border-2 '>
            <div className='w-full flex justify-center mb-4'>
                <img 
                src={service.getFilePreview(featuredImage)} 
                alt={title} 
                className='w-full h-44 sm:h-44 md:h-44 lg:h-44 xl:h-44 relative z-0 rounded-xl transition-transform duration-300 hover:scale-110'/>
            </div>
            <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold'>
                {title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard
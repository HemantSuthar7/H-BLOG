import React, {useEffect, useState} from 'react'
import { Container, PostCard } from "../components"
// import appwriteService from "../appwrite/config"

function Home() {

    // const [posts, setPosts] = useState([]);

    // useEffect( () => {
    //     appwriteService.getPosts()
    //     .then( (posts) => {
    //         if (posts) {
    //             setPosts(posts.documents)
    //         }
    //     } )
    //     .catch((error)=>{
    //         console.log("Did not got posts. -from Home page.     The Error is : ", error);
    //     })
    // }, [] )

    // if (posts.length === 0) {
    //     return (
    //         <div className="w-full py-8 mt-4 text-center">
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     <div className="p-2 w-full">
    //                         <h1 className="text-2xl font-bold hover:text-gray-500">
    //                             Login to read posts
    //                         </h1>
    //                     </div>
    //                 </div>
    //             </Container>
    //         </div>
    //     )
    // }


  return (
    <div className='max-w-full py-8 min-h-screen'>
      <div className='mx-6'>
        <div className='text-center'>
            <h1 className='mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-wrap'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>Blogging made <span className='italic'>easy</span> with H-Blog</span>
            </h1>
        </div>
           <img src="\src\assets\H-Blog_home_img_01.png" alt="Blog with H-Blog" className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto mx-auto mb-4' 
           />
        <div className='text-center'>
            <h1 className='mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-wrap'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>Feature Rich with Various Options To <span className='italic'>Customize</span> Your Blog</span>
            </h1>
        </div>
           <img src="\src\assets\H-Blog_home_img_02.png" alt="Blog with H-Blog" className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto mx-auto mb-4' 
           />
        <div className='text-center'>
            <h1 className='mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-wrap'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>Built-In Rich Text Editor for Customized Blogging <span className='italic'>Experience</span></span>
            </h1>
        </div>
           <img src="\src\assets\H-Blog_home_img_03.png" alt="Blog with H-Blog" className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto mx-auto mb-4' 
           />
        <div className='text-center'>
            <h1 className='mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-wrap'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>Cross-Device compatibility, <span className='italic'>Experience H-Blog </span>in any size</span>
            </h1>
        </div>
           <img src="\src\assets\H-Blog_home_img_04.png" alt="Blog with H-Blog" className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto mx-auto mb-4' 
           />
      </div>   
    </div>
  )
}

export default Home
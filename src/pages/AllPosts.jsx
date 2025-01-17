import React, {useState, useEffect} from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from "../components"



function AllPosts() {

    const [posts, setPosts] = useState([]);

    useEffect( () => {
        appwriteService.getPosts()
        .then( (posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        } )
        .catch( (error) => {
            console.log("There was an error while getting all posts, ERROR : ", error)
            setPosts(null)
        } )
    }, [] )

  return (
    <div className='py-4'>
        <Container>
            <div className='flex flex-wrap'>
                { posts.map( (post) => (
                    <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                        <PostCard {...post} />
                    </div>
                ) ) }
            </div>
        </Container>
    </div>
  )
}

export default AllPosts
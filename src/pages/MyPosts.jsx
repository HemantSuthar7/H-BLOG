import React, {useState, useEffect} from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from "../components"
import { useSelector } from 'react-redux';


function MyPosts() {

    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);

    useEffect( () => {
        const userId = userData.$id
        appwriteService.getUserPosts({userId: String(userId)})
        .then( (posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        } )
        .catch( (error) => {
            console.log("There was an error while getting all user posts, ERROR : ", error)
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

export default MyPosts
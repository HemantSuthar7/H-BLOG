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

  return posts && posts.length > 0 ? (
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
  ) : (
    <div className="w-full py-8 mt-4 text-center">
        <Container>
            <div className="flex flex-wrap">
                <div className="p-2 w-full">
                    <img src="\public\assets\Not-Found.png" alt="Blog with H-Blog" className='w-full max-w-[130px] sm:max-w-[130px] md:max-w-[130px] lg:max-w-[130px] xl:max-w-[200px] h-auto mx-auto mb-4 rounded-2xl' 
                    />
                    <h1 className="text-4xl font-bold text-red-700">
                        Posts Not Found :
                    </h1>
                    <h1 className="text-2xl font-bold text-white hover:text-gray-500">
                        You Currently don't have any posts ! add some posts to see your posts listed here.
                    </h1>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default MyPosts
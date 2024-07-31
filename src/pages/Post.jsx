import React, {useState, useEffect} from 'react'
import appwriteService from "../appwrite/config"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Container } from "../components"
import parse from "html-react-parser"
import { useSelector } from 'react-redux'


function Post() {

    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const {slug} = useParams();
    const userData = useSelector((state) => state.auth.userData);

    console.log(userData)


    const isAuthor = post && userData ? post.userId === userData.$id : false;

    console.log(isAuthor)

    useEffect( () => {
        if (slug) {
            appwriteService.getPost(slug).then( (post) => {
                if(post) setPost(post);
                else navigate("/");
            } );
        }
        else{
            navigate("/");
        }
    }, [slug, navigate] );


    const deletePost = () => {
        appwriteService.deletePost(post.$id).then( (status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage)
                navigate("/")
            };
        });
    };

  return post ? (
    <div className='py-8 px-8'>
        <Container>
            <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                <img 
                src={appwriteService.getFilePreview(post.featuredImage)} 
                alt={post.title} 
                className='rounded-xl'
                />

                {isAuthor && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button className="mr-3 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Edit
                            </Button>
                        </Link>
                        <Button className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={deletePost}>
                            Delete
                        </Button>
                </div>
                )}
            </div>

                <div className='w-full mb-6'>
                    <h1 className='text-2xl font-bold'>{post.title}</h1>
                </div>
                <div className='browser-css'>
                    {parse(post.content)}
                </div>

        </Container>
    </div>

  ) : null
}

export default Post
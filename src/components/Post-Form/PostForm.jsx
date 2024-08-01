import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appwriteService from "../../appwrite/config"
import {Button, Input, Select, RTE} from "../index"


function PostForm({post}) {

    const {register, handleSubmit, watch, control, setValue, getValues} = useForm(
        {
            defaultValues: {
                title: post?.title || "",
                slug: post?.slug || "",
                content: post?.content || "",
                status: post?.status || "active"
            }
        }
    );


    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data)=>{


        if (post) {

            const file = data.featuredImage?.[0] ? await appwriteService.uploadFile(data.featuredImage[0]) : null;


            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
                
            })

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else{

            const file = data.featuredImage?.[0] ? await appwriteService.uploadFile(data.featuredImage[0]) : null;


            if (file) {
                
                data.featuredImage = file.$id;

                const dbPost = await appwriteService.createPost({...data, userId: userData.$id})

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }

        }

        
        

    }


    const slugTransform = useCallback( (value)=> {
        if (value && typeof value === "string") {
            const slug = value.toLowerCase().replace(/ /g, "-")
            // setValue("slug", slug) // will see if this comes in use here or not
            return slug
        }

        return ""
         
    }, [] )


    useEffect( () => {
        
        const subscription = watch((value, {name}) =>{
            if (name === "title") {
                setValue("slug", slugTransform(value.title),{shouldValidate: true})
            }
        })

        return () => {
            subscription.unsubscribe() // optimising useEffect
        }

    }, [watch, slugTransform, setValue] )


  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-full md:w-2/3 px-2">
                <Input
                    label="Title :"
                    labelClassName="text-white"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    readonly="readonly"
                    label="Slug :"
                    labelClassName="text-white"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full md:w-1/3 px-2 mt-4 md:mt-0">
                <Input
                    label="Featured Image :"
                    labelClassName="text-white"
                    type="file"
                    className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("featuredImage", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status :"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                
                <button className="w-full mt-4 md:mt-11 relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800" type="submit" 
                bgColor={post ? "bg-green-500" : undefined}>
                    <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    {post ? "Update" : "Submit"}
                    </span>
                </button>
            </div>
        </form>
  )
}

export default PostForm
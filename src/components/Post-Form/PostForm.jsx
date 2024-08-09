import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import appwriteService from "../../appwrite/config";
import { Button, Input, Select, RTE } from "../index";

function PostForm({ post }) {
  const { register, handleSubmit, watch, control, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const [contentError, setContentError] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (!data.content || data.content.trim() === "") {
      setContentError(true);
      return;
    }

    setContentError(false);

    try {
      let fileId;
      if (data.featuredImage && data.featuredImage[0]) {
        const file = await appwriteService.uploadFile(data.featuredImage[0]);
        fileId = file.$id;
      }

      if (post) {
        const updatedData = {
          ...data,
          featuredImage: fileId || post.featuredImage,
        };
        if (fileId) appwriteService.deleteFile(post.featuredImage);

        const dbPost = await appwriteService.updatePost(post.$id, updatedData);
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        const newData = { ...data, featuredImage: fileId, userId: userData.$id };
        const dbPost = await appwriteService.createPost(newData);
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    } catch (error) {
      console.error("Error submitting the post form:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.toLowerCase().replace(/ /g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-full md:w-2/3 px-2">
        <div className="mb-4">
          <Input
            label="Title :"
            labelClassName="text-white"
            placeholder="Title"
            className={`${errors.title ? 'border-red-500' : ''}`}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        <div className="mb-4">
          <Input
            readOnly
            label="Slug :"
            labelClassName="text-white"
            placeholder="Slug"
            className="mb-4"
            {...register("slug")}
          />
        </div>
        <div className="mb-4">
        {contentError && <p className="text-red-500">Content is required</p>}
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
            onChange={() => setContentError(false)}
          />
          
        </div>
      </div>
      <div className="w-full md:w-1/3 px-2 mt-4 md:mt-0">
        <div className="mb-5">
          <Input
            label="Featured Image :"
            labelClassName="text-white"
            type="file"
            className={`block w-full mb-5 text-sm text-gray-900 border ${
              errors.featuredImage ? 'border-red-500' : 'border-gray-300'
            } rounded-lg cursor-pointer bg-gray-50`}
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("featuredImage", { required: !post && "Featured image is required" })}
          />
          {errors.featuredImage && <p className="text-red-500">{errors.featuredImage.message}</p>}
        </div>
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <div className="mb-4">
          <Select
            options={["active", "inactive"]}
            label="Status :"
            className={`${errors.status ? 'border-red-500' : ''}`}
            {...register("status", { required: "Status is required" })}
          />
          {errors.status && <p className="text-red-500">{errors.status.message}</p>}
        </div>
        <button
          className="w-full mt-4 md:mt-11 relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
        >
          <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {post ? "Update" : "Submit"}
          </span>
        </button>
      </div>
    </form>
  );
}

export default PostForm;

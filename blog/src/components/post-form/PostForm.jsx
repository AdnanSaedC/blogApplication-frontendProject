import React,{useCallback,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button,InputBox,Select,RealTimeEditor} from "../index.js"
import { data, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import service from '../../appwrite/configuration.js'


// we are handling two things here the user is updating the post or the user is creating a new post
function PostForm({post}) {

    const navigate = useNavigate()
    console.log("Post in post form ",post)
    
    const { register,handleSubmit,watch,getValues,setValue,control} = useForm({
        defaultValues:{
            title:post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const userData = useSelector( state => state.auth.userData)
    console.log("userData in post form ",userData)
    

    const submit = async(data)=>{
        // now we have handle two things creating a post and updating the existing post
        // because these are the two things that will happend when user tries to update the file
        console.log("Form data submitted ",data)
        console.log("Existing post ",post)
        if(post){
            console.log("Updating existing post ")
           const file = data.image[0] ? await( service.uploadFile(data.image[0]) ): null;
            console.log("Uploaded file ",file)
            if(file){
                // deleting the existing image which was stored from appwrite using 
                console.log("Deleting existing file ",post.featuredImage)
                await service.deleteFile(post.featuredImage)
                console.log("Existing file deleted ")
            }

            const dbPost = await service.updatePost(post.$id,{
                ...data,
                featuredImage: ( file ? file.$id : null)
            })
            
            //now since post is created lets navigate the user to the newly craeted post
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else{
            const file =  data.image[0] ? await (service.uploadFile(data.image[0])) : null
        

        
            if(file){
              
                data.featuredImage = file.$id
                const dbPost = await service.createPost({
                    ...data,
                    userId:userData.$id
                })

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
            else{
                console.log("File upload failed")
            }
        }
    }

    // useCallback gives the same refrences through all the renders
    const slugTransfrorm = useCallback((textToTrandform)=>{
        if(textToTrandform && typeof textToTrandform ==='string'){
            return textToTrandform
                                .trim()
                                .toLowerCase()
                                .replace(/[^a-zA-Z\d]+/g, "-")
        }

        return " "
    },[])

    useEffect(()=>{
        // watch looks at the input fields continuosly and dont rerenders the components
        // here watch will return the entire object and name field
        const subscription = watch((postObjcet,{name})=>{
            if(name === "title"){
                setValue("slug",slugTransfrorm(postObjcet.title,{shouldValidate:true}))
                // as soon as it updated the field(setValue) it will run validation check
            }
        })

        return ()=>{
            // As soon as the component that contains this form is removed from the screen, the watch callback is unsubscribed and will never run again.
            //if we remove this line The callback keeps listening to the same form instance, not to “other forms”, but after the UI is gone, that listening is meaningless and harmful.
            subscription.unsubscribe()
        }
    },[watch,slugTransfrorm,setValue])

  return (
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <InputBox
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <InputBox
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransfrorm(e.currentTarget.value), { shouldValidate: true });
                        // run the validation checks on the slug which we didn't gaved sadly
                    }}
                />
                <RealTimeEditor label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                {/* we are giving the control from the form here now the form controls this component */}
            </div>
            <div className="w-1/3 px-2">
                <InputBox
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}  // if post exist the image upload is oprional we will use the existing image itself else provide us the image
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm
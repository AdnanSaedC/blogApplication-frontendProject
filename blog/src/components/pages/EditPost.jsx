import React, { useEffect, useState } from 'react'
import {Container,PostForm} from "../index.js"
import service from '../../appwrite/configuration.js'
import { useNavigate,useParams } from 'react-router-dom'

function EditPost() {

    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        service.getSinglePost(slug)
                                .then((thatPost)=>{
                                    if(thatPost){
                                        setPost(thatPost)
                                    }
                                    else{
                                        navigate("/")
                                    }
                                })
    },[slug,navigate])

  return post ? <div className="py-8">
                    <Container>
                        <PostForm post={post}/>
                    </Container>
                </div> : null
}

export default EditPost
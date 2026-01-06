import React,{useState,useEffect} from 'react'
import {Container , PostCard} from "../index.js"
import service from '../../appwrite/configuration.js'

function AllPost() {

    const [post,setPost] = useState([])
    useEffect(()=>{
        // we are not passing any queries we are just giving an empty array
        console.log("fetching all posts")
        service.getPost()
                        .then((posts)=>{
                            if(posts){
                                console.log(posts)
                                setPost(posts.documents)
                            }
                        })
    },[])

  return (
    <div className='w-full py-8'>
        <Container>
            <div className="flex-wrap flex">
                {
                    post.map(
                        (eachPost)=>(
                            <div className="p-2 w-1/4" key={eachPost.$id}>
                                <PostCard  {...eachPost}/>
                            </div>
                        )
                    )
                }
            </div>
        </Container>
    </div>
  )
}

export default AllPost
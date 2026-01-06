import React,{useEffect,useState} from 'react'
import service from "../../appwrite/configuration.js"
import {Container,PostCard} from "../index.js"

function Home() {
    
    const [post,setPost] = useState([])

    useEffect(()=>{
       service.getPost()
                        .then((posts)=>{
                            if(posts){
                                console.log(posts)
                                setPost(posts.documents)
                            }
                        })
                        
    },[])

   
    if(post.length === 0){
        return ( <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div> )
    }
    else{
        return (<div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                     {
                        post.map(
                                (eachPost)=>(
                                <div className="p-2 w-1/4" key={eachPost.$id}>
                                    {console.log(eachPost)}
                                    <PostCard {...eachPost}/>
                                </div>
                                )
                            )
                    }
                </div>
            </Container>
        </div>)
    }
}

export default Home
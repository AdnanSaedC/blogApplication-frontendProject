import React, { useEffect, useState } from 'react'
import service from "../../appwrite/configuration.js"
import { Container, PostCard } from "../index.js"

function Home() {

    const [post, setPost] = useState([])

    useEffect(() => {
        service.getPost()
            .then((posts) => {
                if (posts) {
                    console.log(posts)
                    setPost(posts.documents)
                }
            })

    }, [])


    if (post.length === 0) {
        return (
            <div className="w-full py-20 flex flex-col items-center justify-center min-h-[50vh]">
                <Container>
                    <div className="text-center space-y-6">
                        <div className="inline-block p-4 rounded-full bg-indigo-500/10 mb-4">
                            <svg className="w-12 h-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                            Welcome to Our Blog
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Discover stories, thinking, and expertise from writers on any topic.
                            Login or sign up to start reading and writing your own posts.
                        </p>
                    </div>
                </Container>
            </div>
        );
    } else {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {post.map((eachPost) => (
                            <div key={eachPost.$id} className="h-full">
                                <PostCard {...eachPost} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }
}

export default Home
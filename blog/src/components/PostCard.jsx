import React from 'react'
import service from "../appwrite/configuration.js"
import {Link} from "react-router-dom"

function PostCard({
    $id, //this is syntax of the appwrite
    title,
    featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 p-4 rounded-lg hover:shadow-lg transition-shadow duration-300'>
            <div className='w-full justify-center mb-4'>
                <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl'/>
            </div>
            <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
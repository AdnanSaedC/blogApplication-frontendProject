import React from 'react'
import service from "../appwrite/configuration.js"
import {Link} from "react-router-dom"

function PostCard({
    $id, //this is syntax of the appwrite
    title,
    featuredImage
}) {
  return (
    <Link to={`/post/${$id}`} className="block h-full relative group">
        {/* Glow effect underneath */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
        
        <div className='relative h-full flex flex-col bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-4 rounded-xl shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-indigo-500/10'>
            <div className='w-full aspect-video overflow-hidden rounded-lg mb-4'>
                <img 
                  src={service.getFilePreview(featuredImage)} 
                  alt={title} 
                  className='w-full h-full object-cover transform transition duration-500 group-hover:scale-110'
                />
            </div>
            <h2 className='text-xl font-semibold text-slate-200 line-clamp-2 leading-snug'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../appwrite/configuration.js";
import { Button, Container } from "../index.js";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { set } from "react-hook-form";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? (post.userId === userData.$id) : false;

    useEffect(() => {
        if (slug) {
            service.getSinglePost(slug).then((post) => {
                 console.log("current post");
                    console.log(post);
                    service.getFilePreview(post.featuredImage).then((url) => setImageUrl(url));
                if (post) {setPost(post);}
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12">
            <Container>
                <article className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-10 shadow-xl">
                    <div className="w-full flex justify-center mb-8 relative rounded-xl overflow-hidden shadow-2xl shadow-black/50 group">
                        
                        {post.featuredImage && (
                            <img
                                src={imageUrl}
                                alt={post.title}
                                className="w-full h-auto object-cover max-h-[500px]"
                            />
                        )}

                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 pointer-events-none"></div>

                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-emerald-500/90 hover:bg-emerald-400" className="shadow-lg shadow-emerald-500/20 backdrop-blur-md">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-rose-500/90 hover:bg-rose-400" className="shadow-lg shadow-rose-500/20 backdrop-blur-md" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}

                        <div className="absolute bottom-6 left-6 right-6">
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                                {post.title}
                            </h1>
                        </div>
                    </div>
                    
                    <div className="browser-css text-slate-300 leading-relaxed text-lg space-y-6">
                        {parse(post.content)} 
                    </div>
                </article>
            </Container>
        </div>
    ) : null;
}
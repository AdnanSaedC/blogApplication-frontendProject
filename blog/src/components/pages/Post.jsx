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
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    
                    {post.featuredImage && (
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="rounded-xl"
                        />
                        )}


                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)} 
                    {/* //since the content is we are storing in html format in database(Realtime editor which we are using stores that way) */}
                    </div>
            </Container>
        </div>
    ) : null;
}
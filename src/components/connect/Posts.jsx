import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaCommentDots, FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [commentText, setCommentText] = useState({});
    const [showComments, setShowComments] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentUser(Cookies.get('email') || '');
        const getPosts = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/getPosts`);
                setPosts(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getPosts();
    }, []);

    const handleLike = async (id, isLiked) => {
        try {
            const url = isLiked 
                ? `${process.env.REACT_APP_BASE_URL}/post/removeLike/${id}` 
                : `${process.env.REACT_APP_BASE_URL}/post/addLike/${id}`;
            await axios.patch(url, { email: currentUser });

            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/getPosts`);
            setPosts(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddComment = async (id) => {
        if (!commentText[id]) return;

        try {
            await axios.patch(`${process.env.REACT_APP_BASE_URL}/post/addComment`, {
                postId: id,
                email: currentUser,
                comment: commentText[id]
            });

            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/getPosts`);
            setPosts(res.data);
            setCommentText({ ...commentText, [id]: '' });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="posts w-9/12 text-black relative">
            {posts.map((post) => {
                const isLiked = post.likedUsers.includes(currentUser);

                return (
                    <div className="postContainer m-5 w-11/12" key={post._id}>
                        <center className="postHeader flex gap-2 items-center p-2 ml-8">
                            <img src={post.authorImage} alt="profile" className="rounded-full w-24 h-24"/>
                            <div className="postHeader flex flex-col justify-start">
                                <h1 className="postName font-bold text-3xl">{post.author}</h1>
                                <p className="postTime">{post.date.substr(0, 10) + ' ' + post.date.substr(11, 5)}</p>
                            </div>
                        </center>
                        <center>
                            <div className="ml-5 w-10/12 text-left">
                                <p>{post.description}</p>
                            </div>
                            <img className='postImage h-80 w-10/12' src={post.imageUrl} alt="Post"/>
                        </center>
                        <div className="postActions flex gap-8 ml-8 mt-2 w-10/12">
                            <span className="flex gap-3 p-2 pl-5 pr-5 font-semibold text-xl rounded-full">
                                <button className="text-4xl text-white" onClick={() => handleLike(post._id, isLiked)}>
                                    {isLiked ? <FcLike /> : <FcLikePlaceholder />}
                                </button>
                                <p>{post.likes}</p>
                            </span>
                            <span className="flex gap-3 p-2 pl-5 pr-5 font-semibold text-xl rounded-full">
                                <button className="text-3xl text-black" onClick={() => setShowComments({ ...showComments, [post._id]: !showComments[post._id] })}>
                                    <FaCommentDots/>
                                </button>
                                <p>{post.comments.length}</p>
                            </span>
                        </div>
                        {showComments[post._id] && (
                            <div className="commentSection ml-12 mb-5 w-5/6 p-4 bg-gray-100 rounded-lg">
                                <div className="commentInput flex gap-3 items-center">
                                    <input 
                                        type="text" 
                                        placeholder='Type a comment' 
                                        className="w-full p-2 border border-gray-300 rounded-lg" 
                                        value={commentText[post._id] || ''} 
                                        onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })}
                                    />
                                    <button 
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                        onClick={() => handleAddComment(post._id)}>
                                        Post
                                    </button>
                                </div>
                                <div className="commentList mt-3 space-y-2">
                                    {post.comments.map((c, index) => (
                                        <div key={index} className="flex items-center gap-3 p-2 bg-white shadow-md rounded-lg">
                                            <img src={c.userImage} alt="User" className="w-10 h-10 rounded-full"/>
                                            <div>
                                                <p className="font-semibold">{c.user}</p>
                                                <p className="text-gray-700">{c.comment}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
            <div className="fixed text-4xl bottom-5 text-blue-500" style={{right: '22rem'}} onClick={() => {navigate('/add/Post')}}><FaCirclePlus/></div>
        </div>
    );
}

export default Posts;

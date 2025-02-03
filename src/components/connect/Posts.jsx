import React from 'react'
import './connect.css'
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa6";

function Posts() {
    const [isLiked, setIsLiked] = React.useState(false);
    const [showComments, setShowComments] = React.useState(false);

  return (
    <div className="posts w-9/12 text-black ">
        <div className="postContainer m-5">
            <center className="postHeader flex gap-2 items-center p-2 ml-8">
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile" className="rounded-full w-24 h-24"/>
                <div className="postHeader flex flex-col justify-between">
                    <h1 className="postName font-bold text-3xl">John Doe</h1>
                    <p className="postTime">2 hours ago</p>
                </div>
            </center>
            <center><div className="ml-5 ">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <img className='postImage h-96 w-11/12' src="https://images.unsplash.com/photo-1493612276216-ee3925520721?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww" alt="Post"/></center>
            <div className="postActions flex gap-8 ml-8 mt-2">
                <span className="flex gap-3 p-2 pl-5 pr-5 font-semibold text-xl rounded-full">
                    <button className="text-4xl text-white" onClick={() => {setIsLiked(!isLiked)}}>{isLiked ? <FcLike/> : <FcLikePlaceholder/>}</button>
                    <p>3</p>
                </span>
                <span className="flex gap-3 p-2 pl-5 pr-5 font-semibold text-xl rounded-full">
                    <button className="text-3xl text-black" onClick={() => {setShowComments(!showComments)}}><FaCommentDots/></button>
                    <p>5</p>
                </span>
            </div>
            {showComments && <input type="text" placeholder='Type a comment' className="commentArea ml-12 mb-5 w-5/6"/> }
        </div>
    </div>
  )
}

export default Posts

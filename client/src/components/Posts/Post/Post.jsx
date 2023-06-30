import React from 'react'
import moment from 'moment';
import { deletePost, likePost, getPost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import link from "../../../assets/link.png";
import liked from "../../../assets/liked.png";
import like from "../../../assets/like.png";
import deleteIcon from "../../../assets/delete.png";
import edit from "../../../assets/edit.png";
import { Link } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  const Likes = () => {
    if (post.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <div className="flex items-center">
          <img className="h-[30px]" src={liked} alt="Liked" />
          <span className="ml-2">
            {post.likes.length > 2
              ? `You and ${post.likes.length - 1} others`
              : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
          </span>
        </div>
      ) : (
        <div className="flex items-center">
          <img className="h-[30px]" src={like} alt="Like" />
          <span className="ml-2">
            {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
          </span>
        </div>
      );
    }
    return <div className="flex items-center">
      <img className="h-[30px]" src={like} alt="Like" />
      <span className="ml-2">
        Like
      </span>
    </div>;
  }
  const openPost = () => {
    dispatch(getPost(post._id), navigate);
    navigate(`/posts/${post._id}`)
  }
  return (
    <div className="w-80 mt-24 m-auto lg:mt-16 max-w-sm">
      <div className="bg-white shadow-2xl rounded-xl">
        {(user?.result?._id === post?.creator) && (
          <div className="items-end">
            <button onClick={() => {
              setCurrentId(post._id)
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
            }}>
              <img src={edit} className="h-[30px]" />
            </button>
          </div>
        )}
        <h2 className="text-center text-gray-800 text-2xl font-bold pt-6">{post.title}</h2>
        <Link to={`/profile/${post.creator}`}>
          <p className="text-center text-sm mt-2 text-gray-700 font-semibold">Author: {post.name}</p>
        </Link>
        <div className="justify-center mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <p className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800">
              #{tag}
            </p>
          ))}
        </div>
        <div className="w-5/6 m-auto">
          <p className="text-center text-gray-700 font-medium pt-5">{moment(post.createdAt).fromNow()}</p>
        </div>

        <div className="w-5/6 m-auto">
          <p className="text-center text-gray-800 pt-5">Description: {post.message}</p>
        </div>
        <div className="grid grid-cols-4 w-72 lg:w-5/6 m-auto bg-indigo-50 mt-5 p-4 lg:p-4 rounded-2xl">
          <div className="col-span-1">
            <img className="h-[35px]" src={link} alt="Link Icon" />
          </div>
          <div className="col-span-2 pt-1">
            <p className="text-gray-800 font-bold lg:text-sm">Resource Link</p>
            <a href={post.link} className="text-gray-500 text-sm">Click here</a>
          </div>
        </div>

        <div class="py-5 px-5">
          <button onClick={openPost} class="transition duration-200 bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-2xl text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
            <span class="inline-block mr-2">More Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
              <path StrokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between mt-1 py-8 px-6 items-center font-medium text-gray-500">
          <button disabled={!user?.result} onClick={() => { dispatch(likePost(post._id)) }}>
            <Likes />
          </button>
          {(user?.result?._id === post?.creator) && (
            <button onClick={() => dispatch(deletePost(post._id))}>
              <img src={deleteIcon} className="h-[30px] py-0.5" alt="Delete Icon" />
            </button>
          )}
        </div>
      </div>
    </div>




  )
}

export default Post

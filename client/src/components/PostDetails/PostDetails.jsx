import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import Comments from './Comments';
import { getPost, getPostsBySearch } from '../../actions/posts';
import link from "../../assets/link.png";
import liked from "../../assets/liked.png";
import like from "../../assets/like.png";
import Navbar from '../Navbar/Navbar';
import { likePost } from '../../actions/posts';

const PostDetails = () => {
    const { post, posts } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const { id } = useParams();
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
    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);


    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post]);
    if (!post) return null;

    const openPost = (p) => navigate(`/posts/${p}`);

    const recommendedPosts = posts?.filter(({ _id }) => _id !== post._id);

    return (
        <div className="bg-gray-100" >
            <Navbar />
            <div className="justify-center min-h-screen">
                <div className="w-full flex justify-center">
                    <div className="bg-white  md:w-full md:max-w-md max-w-sm flex px-4 mt-10 shadow-2xl rounded-xl">
                        <div className="px-5 py-7 w-full">
                            <h2 className="text-center text-gray-800 text-3xl font-bold pt-6">{post.title}</h2>
                            <Link to={`/profile/${post.creator}`}>
                                <p className="text-center text-xl mt-2 text-gray-700 font-semibold">Author: {post.name}</p>
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
                            <div className="flex justify-between mt-1 py-8 px-6 items-center font-medium text-gray-500">
                                <button disabled={!user?.result} onClick={() => {
                                    dispatch(likePost(post._id));
                                    window.location.reload();
                                }}>
                                    <Likes />
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100">
                <h2 className="text-center text-gray-800 text-3xl font-bold pt-6">Recommended Posts</h2>
            </div>
            <div>
                {recommendedPosts.length > 0 ? (
                    <div className="bg-gray-100">
                        <div className="flex flex-wrap justify-center -mx-2">
                            {recommendedPosts.map(({ title, name, tags, likes, link, _id }) => (
                                <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2">
                                    <div className="bg-white flex px-4 mt-10 shadow-2xl rounded-xl">
                                        <div className="px-5 py-7 w-full">
                                            <h2 className="text-center text-gray-800 text-lg font-bold pt-6">{title}</h2>
                                            <Link to={`/profile/${post.creator}`}>
                                                <p className="text-center text-l mt-2 text-gray-700 font-semibold">Author: {name}</p>
                                            </Link>
                                            <div className="justify-center mt-4 flex flex-wrap gap-2">
                                                {tags.map((tag) => (
                                                    <p className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                                                        #{tag}
                                                    </p>
                                                ))}
                                            </div>
                                            <h2 className="text-center text-gray-500 text-lg font-bold pt-6">{likes?.length} Likes</h2>
                                            <div class="py-7 px-7">
                                                <button onClick={() => openPost(_id)} key={_id} class="transition duration-200 bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-2xl text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                                    <span class="inline-block mr-2">More Details</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                                                        <path StrokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-100 min-h-full">
                        <h2 className="text-center text-gray-800 text-l font-bold pt-6">No Posts To Recommend!</h2>
                    </div>

                )}
            </div>
            <div className="mt-10 bg-gray-100">
                <Comments post={post} />
            </div>

        </div>
    )
}

export default PostDetails

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { followUser, userProfile, deleteUser } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import Post from '../Posts/Post/Post';
import { useLocation, useNavigate } from 'react-router-dom';
import decode from "jwt-decode";
import * as actionType from "../../constants/actionTypes";
import Form from '../Form/Form';
import { getPosts } from '../../actions/posts';

const UserProfile = () => {
  const userdata = useSelector(state => state.authReducer.userData);

  const { posts, isLoading } = useSelector((state) => state.posts);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  if (userdata._id !== id) {
    Object.keys(userdata).forEach((key) => {
      userdata[key] = null;
    });
  }
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/');
    setUser(null);
  }
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));

  }, [location]);
  //const data = JSON.parse(userdata);
  const lenFollowers = userdata.followers ? userdata.followers.length : 0;
  const lenFollowing = userdata.following ? userdata.following.length : 0;
  const userPosts = posts?.filter((post) => post.creator === id);
  const handleFollowUser = () => {
    dispatch(followUser(userdata?._id));
    window.location.reload();
  };
  useEffect(() => {
    dispatch(userProfile(id));
  }, [id]);
  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteUser(user?.result?._id));
      logout();
      alert("Account Deleted, Hope To See You Again!!")
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="bg-gray-100">
      <div className="relative z-20">
        <Navbar />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center">
        <div class="p-6">
          <div class="p-24 bg-white shadow mt-24">
            <div class="grid grid-cols-1 md:grid-cols-3">
              <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                <div>
                  <p class="font-bold text-gray-700 text-xl">{lenFollowers}</p>
                  <p class="text-gray-400">Followers</p>
                </div>
                <div>
                  <p class="font-bold text-gray-700 text-xl">{lenFollowing}</p>
                  <p class="text-gray-400">Following</p>
                </div>
                <div>
                  <p class="font-bold text-gray-700 text-xl">{userPosts.length}</p>
                  <p class="text-gray-400">Posts</p>
                </div>
              </div>
              <div class="relative z-30">
                <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              {(userdata?._id !== user?.result?._id && user?.result && userdata?.name) && (
                <div class="space-x-8 flex justify-center mt-32 md:mt-0 md:justify-center">

                  <button
                    disabled={!user?.result}
                    onClick={handleFollowUser}
                    className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    {userdata?.followers?.includes(user?.result?._id) ? (
                      <h1>Unfollow</h1>
                    ) : (
                      <h1>Follow</h1>
                    )}
                  </button>

                </div>
              )}

            </div>

            <div class="mt-20 text-center border-b pb-12">
              <h1 className="text-4xl font-medium text-gray-700">
                {userdata.name ? userdata.name : "Deleted User"}
              </h1>
              <p class="font-light text-gray-600 mt-3">{userdata.email}</p>

            </div>

            <div class="mt-12 flex flex-col justify-center">
              <p class="text-gray-700 text-2xl text-center font-medium lg:px-16">Posts by {userdata.name ? userdata.name : "Deleted User"}</p>
              <div className="grid grid-flow-row gap-8  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">


                {userPosts.map((post) => (
                  <div key={post._id}>
                    <Post post={post} setCurrentId={setCurrentId} />

                  </div>
                ))}
                {(userdata?._id === user?.result?._id && userdata.name) && (
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      {(userdata?._id === user?.result?._id && user?.result) && (



        <div >
          <div className="w-full flex justify-center">
            <div className="bg-white  md:w-full md:max-w-md max-w-sm flex px-4 py-7 mb-10 mt-10 shadow-2xl rounded-xl">
              <div className="px-5 py-7 w-full">
                <label class="font-semibold text-lg text-center text-red-700 pb-1 block">Danger Zone</label>
                <div className="flex mt-10 justify-center">
                  <button onClick={handleDeleteAccount} className="text-white py-2 px-5 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      )}

    </div>




  )
}

export default UserProfile

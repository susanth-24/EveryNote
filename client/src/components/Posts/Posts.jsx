import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  if (!posts.length && !isLoading) return 'No Posts';
  return (
    <div className="grid grid-flow-row gap-8  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">

      {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))}
    </div>
  )
}

export default Posts

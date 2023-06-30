import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Form from '../Form/Form'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Posts from '../Posts/Posts';
import Paginate from '../../pagination'
import ChipInput from 'material-ui-chip-input';
import Comments from '../PostDetails/Comments'
import Footer from '../Footer/Footer'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(0);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState('');
  const handleAddChip = (tag) => setTags([...tags, tag]);
  const handleDeleteChip = (del) => setTags(tags.filter((tag) => tag !== del));
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  };
  return (
    <div className="bg-gray-100 justify-center">
      <Navbar className="z-50" />
      <div className="w-full flex justify-center">
        <div className="bg-white  md:w-full md:max-w-md max-w-sm flex px-4 mt-10 shadow-2xl rounded-xl">
          <div className="px-5 py-7 w-full">
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Search Bar</label>
            <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} name="search" placeholder="Search for Titles" type="text" class="bg-white text-black border rounded-lg px-3 py-4 mt-1 mb-5 text-sm w-full" />
            <div >
              <ChipInput
                className="w-full"
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
            </div>
            <div class="py-5 px-5">
              <button onClick={searchPost} type="button" class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                <span class="inline-block mr-2">Search</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                  <path StrokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>


        </div>
      </div>
      {(!searchQuery && !tags.length) && (
        <div className="w-full flex justify-center">
          <div className="bg-white  md:w-full md:max-w-md max-w-sm flex px-4 mt-10 shadow-2xl rounded-xl">
            <div className="px-5 py-7 w-full items-center">
              <Paginate page={page} />
            </div>
          </div>
        </div>
      )}



      <div className="container mx-auto mt-10 px-4">
        <Posts setCurrentId={setCurrentId} />

        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </div>
      <Footer />
    </div>



  )
}

export default Home

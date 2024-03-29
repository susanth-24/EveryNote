import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'
import logo from "../../assets/EN_logo.png";
import { Link } from 'react-router-dom';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [requestStatus, setRequestStatus] = useState({ loading: false, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setRequestStatus({ loading: true, error: null });

    try {
      if (isSignup) {
        await dispatch(signup(formData, navigate));
      } else {

        await dispatch(signin(formData, navigate));
      }

      setRequestStatus({ loading: false, error: null });
    } catch (error) {
      setRequestStatus({ loading: false, error: error.response.data.message });
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setRequestStatus({ loading: true, error: null });
  }
  //const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword);

  return (
    <form class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12" onSubmit={handleSubmit}>
      <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="mb-5 px-[125px] justify-between items-center">
          <Link to="/posts" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-9 h-9 object-contain rounded-full" />
            <p className="text-black text-[25px] font-semibold cursor-pointer hidden sm:block">EveryNote &nbsp;</p>
          </Link>
        </div>
        <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div class="px-5 py-7">
            {isSignup && (
              <>
                <label class="font-semibold text-sm text-gray-600 pb-1 block">First Name</label>
                <input name="firstName" onChange={handleChange} type="text" required class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                <label class="font-semibold text-sm text-gray-600 pb-1 block">Last Name</label>
                <input required name="lastName" onChange={handleChange} type="text" class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
              </>
            )}
            <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
            <input required name="email" onChange={handleChange} type="text" class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
            <input required name="password" onChange={handleChange} type="text" class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
            {isSignup && (
              <>
                <label class="font-semibold text-sm text-gray-600 pb-1 block">Confirm Password</label>
                <input required name="confirmPassword" onChange={handleChange} type="text" class="bg-white text-black border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" /></>)}
          </div>
          <div className="text-center text-gray-600">
            {error && <p>{error}</p>}
          </div>

          {requestStatus.error && (
            <div className="text-center">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                {requestStatus.error}
              </label>
            </div>
          )}


          <div class="py-5 px-5">
            <button onClick={handleSubmit} type="button" class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span class="inline-block mr-2">{isSignup ? 'Sign Up' : 'Sign In'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                <path StrokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
          <div class="py-5 px-5">
            <button type="button" onClick={switchMode} class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span class="inline-block mr-2">{isSignup ? 'Already have an account? SignIn' : 'Dont have an account? SignUp'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                <path StrokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
        <div class="py-5">
          <div class="grid grid-cols-2 gap-1">
            <Link to="/posts" class="text-center sm:text-left whitespace-nowrap">
              <button class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
                  <path StrokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span class="inline-block ml-1">Back </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </form>

  )
}

export default Auth

import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from "../../assets/EN_logo.png";
import * as actionType from "../../constants/actionTypes";
import { useDispatch } from 'react-redux';
import decode from "jwt-decode";
import pologo from "../../assets/p_icon.png";
const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const realUser = JSON.parse(localStorage.getItem('profile'));
    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        navigate('/posts');

        setUser(null);
        window.location.reload();
    }
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location]);
    return (
        <nav className="bg-white w-full flex  justify-between items-center mx-auto px-8 h-20 ">
            <div className="w-full flex justify-between
            items-center max-w-7xl mx-auto">
                <Link to="/posts" className="flex items-center gap-2">
                    <img src={logo} alt="logo" className="w-9 h-9 object-contain rounded-full" />
                    <p className="text-black text-[25px] font-semibold cursor-pointer hidden sm:block">EveryNote &nbsp;</p>
                </Link>
            </div>
            <div class="mt-2">

                {user?.result ? (
                    <div className="w-full flex justify-between
                items-center  max-w-7xl  gap-4">
                        <Link to={`/profile/${realUser?.result?._id}`} className="w-9 h-9 mb-1">
                            <img src={pologo} alt="pologo" className=" object-contain rounded-full " />
                        </Link>


                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm  px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <Link to="/auth">
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">SignIn</button>
                    </Link>
                )}
            </div>

        </nav>
    )
}

export default Navbar

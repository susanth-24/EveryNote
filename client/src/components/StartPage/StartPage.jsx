import React from 'react'
import logo from '../../assets/EN_logo.png';
import { Link } from 'react-router-dom';
const StartPage = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <div className="bg-gray-100 justify-center min-h-screen ">
            <div class="p-16">
                <div class="p-8 bg-white shadow mt-4">
                    <div className="flex justify-center items-center">
                        <div className="items-center">
                            <img src={logo} alt="logo" className="h-[100px] object-contain rounded-full" />
                        </div>
                    </div>

                    <div class="mt-10 text-center border-b pb-12">
                        <h1 class="text-4xl font-medium text-black">EveryNote</h1>
                    </div>

                    <div class="mt-12 flex flex-col justify-center">
                        <p class="text-gray-800 text-center font-light lg:px-16">
                            Welcome to EveryNote, your go-to platform for accessing study materials before exams.
                            Designed specifically for students, EveryNote provides a convenient and reliable way
                            to find comprehensive notes and study resources for various subjects. Whether you're
                            preparing for a final exam, need additional reference materials, or simply want to enhance
                            your understanding of a topic, EveryNote is here to support your academic journey.
                        </p>
                        {!user?.result ? (
                            <div>
                                <div className="flex mt-20 justify-center">
                                    <Link to="/auth" >
                                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get Started</button>
                                    </Link>
                                </div>
                                <Link to="/posts">
                                    <h1 className="text-gray-800 mt-7 hover:underline focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb">
                                        No, Take Me To Posts Without SignIn
                                    </h1>
                                </Link>
                            </div>
                        ) : (<Link to="/posts">
                            <h1 className="text-gray-800 mt-7 hover:underline focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb">
                                Take Me To Posts
                            </h1>
                        </Link>)}

                        <div>

                        </div>
                    </div >

                </div>
            </div>
        </div>
    )
}

export default StartPage

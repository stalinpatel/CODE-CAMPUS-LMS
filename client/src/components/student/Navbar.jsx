import React from 'react';
import assets from '../../assets/assets.js'
import { Link } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
    const isCourseListPage = location.pathname.includes('/course-list')
    const { user } = useUser();
    const { openSignIn } = useClerk();

    return (
        <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? "bg-white" : "bg-cyan-100/70"}`}>
            <img src={assets.logo} alt="Logo" className='w-28 lg:w-32 cursor-pointer' />
            {/* Desktop view */}
            <div className='hidden md:flex items-center gap-5 text-gray-500 '>
                <div className='flex items-center md:gap-2 lg:gap-3 '>
                    {
                        user && <>
                            <button>Become Educator</button>
                            |
                            <Link to={'/my-enrollments/3'}>My Enrollments</Link>
                        </>
                    }
                </div>
                {
                    user ? <UserButton /> :
                        <button onClick={() => openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>
                }
            </div>
            {/* For Mobile view */}
            <div className='md:hidden flex items-center gap-1 sm:gap-3 text-gray-500'>
                <div className='flex items-center gap-1 sm:gap-2  text-xs sm:text-sm md:text-base '>
                    {
                        user && <>
                            <button>Become Educator</button>
                            |
                            <Link to={'/my-enrollments/3'}>My Enrollments</Link>
                        </>
                    }
                </div>
                {
                    user
                        ? <UserButton />
                        : <button onClick={() => openSignIn()}>
                            <img src={assets.userIcon} alt="user_icon" />
                        </button>
                }

            </div>
        </div >
    );
};

export default Navbar;
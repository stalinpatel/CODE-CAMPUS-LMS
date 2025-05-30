import React, { useContext } from 'react';
import dummyEducatorData from "../../assets/assets"
import { useUser, UserButton } from "@clerk/clerk-react"
import { AppContext } from '../../context/AppContext';
import assets from '../../assets/assets';
import { Link } from 'react-router-dom';
import codeCampusLogo from "../../assets/assets.js"


const Navbar = () => {

    const educatorData = dummyEducatorData;
    const { user } = useUser();
    const { navigate } = useContext(AppContext)
    return (
        <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 bg-white transition-all duration-300 ease-in-out`}>
            <Link to={"/"}>
                <img src={assets.codeCampusLogo} alt="Logo" className='w-32 lg:w-40  cursor-pointer ' />
            </Link>
            {/* Desktop view */}
            <div className='hidden md:flex items-center gap-5 text-gray-500 '>
                {
                    user && <>
                        <Link to={"/educator"}>Dashboard</Link>
                        |
                        <p>
                            Hi! {user ? user.fullName : "Developers"}
                        </p>
                    </>
                }
                {
                    user ? <UserButton /> :
                        <button onClick={() => openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>
                }
            </div>
            {/* For Mobile view */}
            <div className='md:hidden flex items-center gap-1 sm:gap-3 text-gray-500'>
                <div className='flex items-center gap-1 sm:gap-2  text-xs sm:text-sm md:text-base '>

                </div>
                <p>
                    Hi! {user ? user.fullName : "Developers"}
                </p>
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
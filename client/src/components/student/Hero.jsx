import React from 'react';
import assets from '../../assets/assets';

const Hero = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70'>

            <h1 className='text-2xl  md:text-5xl  relative font-bold text-gray-800 max-w-3xl mx-auto'>Empower your future with the courses designed to
                <span className='text-blue-600'> fit your choice.</span>
                <img className='md:block hidden absolute -bottom-7 right-0' src={assets.sktech} alt="sketch" />
            </h1>
            {/* Desktop view */}
            <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>
                We bring together world-class instructors, interactive content, and  a supportive community to help you achive your persobal and professional goals.
            </p>
            {/* Mobile  view */}
            <p className='md:hidden block text-gray-500 max-w-sm mx-auto text-xs sm:text-sm'>
                We bring together world-class instructors to help you achive your persobal and professional goals.
            </p>
        </div>
    );
};

export default Hero;
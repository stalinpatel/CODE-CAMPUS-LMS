import React from 'react';
import Navbar from '../../components/student/Navbar';
import Hero from '../../components/student/Hero';
import SearchBar from '../../components/student/SearchBar';
import Companies from "../../components/student/Companies"
import CoursesSection from '../../components/student/CoursesSection';

const Home = () => {
    return (
        <div className='flex flex-col justify-center items-center space-y-7 text-center'>
            <Hero />
            <SearchBar />
            <Companies />
            <CoursesSection />
        </div>
    );
};

export default Home;
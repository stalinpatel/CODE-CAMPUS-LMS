import React from 'react';
import Navbar from '../../components/student/Navbar';
import Hero from '../../components/student/Hero';
import SearchBar from '../../components/student/SearchBar';
import Companies from "../../components/student/Companies"
import CoursesSection from '../../components/student/CoursesSection';
import TestimonialSection from '../../components/student/TestimonialSection';
import CallToAction from "../../components/student/CallToAction"
import Footer from "../../components/student/Footer"

const Home = () => {
    return (
        <div className='flex flex-col justify-center items-center space-y-7 text-center'>
            <Hero />
            <div className='w-full px-6 sm:px-10'>
                <SearchBar />
            </div>
            <Companies />
            <CoursesSection />
            <TestimonialSection />
            <CallToAction />
            <Footer />
        </div>
    );
};

export default Home;
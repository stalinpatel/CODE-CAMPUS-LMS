import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/educator/Navbar';
import SideBar from '../../components/educator/Sidebar';
import Footer from '../../components/educator/Footer';


const Educator = () => {
    return (
        <>
            <div className='min-h-screen bg-white'>
                <Navbar />
                <div className='flex flex-col-reverse sm:flex-row max-sm:pb-14'>
                    <SideBar />
                    <div className='flex-1'>
                        {<Outlet />}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Educator;
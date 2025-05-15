import React, { useContext } from 'react';
import assets from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
    const menuItems = [
        { name: 'Dashboard', path: '/educator', icon: assets.homeIcon },
        { name: 'Add Course', path: '/educator/add-course', icon: assets.addIcon },
        { name: 'My Courses', path: '/educator/my-courses', icon: assets.myCourseIcon },
        { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.personTickIcon },
    ];

    const { isEducator } = useContext(AppContext);

    return isEducator && (
        <>
            {/* Desktop Sidebar */}
            <div className='hidden sm:flex md:w-64 w-16 border-r min-h-screen text-base border-gray-200 bg-white py-2 flex-col transition-all duration-300 ease-in-out'>
                {
                    menuItems.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            end={item.path === '/educator'}
                            className={({ isActive }) => `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 transition-all duration-200 ease-in-out ${isActive
                                ? 'bg-indigo-50 border-r-[6px] border-indigo-500/90'
                                : 'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90'
                                }`}
                        >
                            <img src={item.icon} alt={item.name} className="w-6 h-6" />
                            <p className="md:block hidden text-center transition-all duration-200 ease-in-out">{item.name}</p>
                        </NavLink>
                    ))
                }
            </div>

            {/* Mobile Bottom Navbar */}
            <div className='sm:hidden fixed bottom-0 left-0 right-0 bg-white shadow-inner border-t border-gray-200 z-50 flex justify-around items-center py-2 h-14'>
                {
                    menuItems.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            end={item.path === '/educator'}
                            className={({ isActive }) => `flex flex-col w-full items-center justify-center px-2 py-1 text-xs transition-all duration-200 ease-in-out ${isActive
                                ? 'text-indigo-600 bg-indigo-100'
                                : 'text-gray-500 hover:text-indigo-500'
                                }`}
                        >
                            <img src={item.icon} alt={item.name} className="w-5 h-5 mb-1" />
                            <span>{item.name.split(' ')[0]}</span>
                        </NavLink>
                    ))
                }
            </div>
        </>
    );
};

export default SideBar;
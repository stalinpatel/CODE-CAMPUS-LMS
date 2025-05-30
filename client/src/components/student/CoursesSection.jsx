import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CoursesCard from './CoursesCard';
import { AppContext } from '../../context/AppContext';
import Spinner from "../../components/student/Spinner"

const CoursesSection = () => {

  const { allCourses, fetchingAllCourses } = useContext(AppContext)

  if (fetchingAllCourses) {
    return (
      <div className='py-16 px-10  md:px-20 lg:px-32 0'>
        <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
        <p className='text-sm md:text-base text-gray-500 mt-3'>Discover our top-rated course across various categories. From coding and design to business and wellness, our courses are crafted to deliver results. </p>
        <div className='flex items-center justify-center w-full my-10 md:my-20'>
          <Spinner classNames='scale-150 md:scale-200' />
        </div>

        <Link
          className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded'
          to={"/course-list"}
          onClick={() => scrollTo(0, 0)}
        >
          Show all courses
        </Link>
      </div>
    );
  }

  return (
    <div className='py-16 px-10  md:px-20 lg:px-32 0'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3'>Discover our top-rated course across various categories. From coding and design to business and wellness, our courses are crafted to deliver results. </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 gap-4 md:my-16 my-10   content-center w-full  justify-between'>
        {
          allCourses.slice(0, 4).map((course, index) => {
            return <CoursesCard key={index} course={course} />
          })
        }
      </div>
      <Link
        className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded'
        to={"/course-list"}
        onClick={() => scrollTo(0, 0)}
      >
        Show all courses
      </Link>
    </div>
  );
};

export default CoursesSection;
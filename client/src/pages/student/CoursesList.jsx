import React, { useContext, useEffect, useState } from 'react';
import assets from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import SearchBar from '../../components/student/SearchBar';
import { useParams } from 'react-router-dom';
import CoursesCard from '../../components/student/CoursesCard';
import Footer from '../../components/student/Footer';
import Spinner from "../../components/student/Spinner"

const CoursesList = () => {
  const { navigate, allCourses, fetchingAllCourses } = useContext(AppContext)
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState(allCourses || []);
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice()
      const searchTerm = input?.toLowerCase() || '';

      setFilteredCourse(
        searchTerm
          ? tempCourses.filter(item =>
            item?.courseTitle?.toLowerCase()?.includes(searchTerm)
          )
          : tempCourses
      );
    }
  }, [allCourses, input])

  if (fetchingAllCourses) {
    return (
      <div className='w-full flex items-center justify-center my-20 scale-150'>
        <Spinner />
      </div>
    )
  }
  return (
    <>
      <div className='flex w-full flex-col px-8 sm:px-16 md:px-20 lg:px-40 '>
        <div className="flex md:flex-row flex-col gap-6 mt-10 md:mt-20 items-start justify-between w-full mb-10">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">Course List</h1>
            <p className="text-gray-500">
              <span onClick={() => navigate("/")} className="text-blue-600 cursor-pointer">Home</span> / <span>Course List</span>
            </p>
          </div>
          <div className='w-full'>
            <SearchBar key={input} data={input} />
          </div>
        </div>
        {
          input && <div className='flex items-center text-sm justify-center my-4 gap-2 text-gray-500 border border-gray-700/40 w-fit py-1 px-3 rounded'>
            <span>{input}</span>
            <img onClick={() => {
              navigate("/course-list")
              setFilteredCourse(allCourses || []);
            }} src={assets.crossIcon} width={12} alt="cross_icon" className='cursor-pointer' />
          </div>
        }
        {
          !fetchingAllCourses && filteredCourse.length === 0 && (
            <div className="text-center w-full text-gray-500 my-8 text-lg">
              No results found for <span className="font-medium text-gray-700">"{input}"</span>
            </div>
          )
        }
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 sm:gap-6 md:gap-8 '>
          {
            filteredCourse.map((course, index) => (
              <CoursesCard key={index} course={course} />
            ))
          }
        </div>
      </div>
      <Footer />
    </>

  );
};

export default CoursesList;
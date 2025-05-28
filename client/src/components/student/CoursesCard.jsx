import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const CoursesCard = ({ course }) => {
  const { currency, getStars, getRating } = useContext(AppContext)




  return (
    <Link
      to={"/course/" + course._id}
      onClick={() => scrollTo(0, 0)}
      className="pb-1 sm:pb-3 md:pb-5  grow max-w-full rounded-xl border border-gray-500/30 shadow-sm overflow-hidden">
      <img src={course.courseThumbnail} alt={course.courseTitle} className="w-full  object-cover" />
      <div className="p-3 flex items-start flex-col">
        <h3 className="font-semibold text-base md:text-lg leading-tight text-start">{course.courseTitle}</h3>
        <p className="text-gray-500 text-xs sm:text-sm mb-2">{course?.educator.name}</p>
        <div className="flex items-start text-xs sm:text-sm justify-center space-x-1 mb-1">
          <span className="font-semibold text-xs sm:text-sm">{getRating(course.courseRatings)}</span>
          <div className="flex">{getStars(getRating(course.courseRatings))}</div>
          <span className="text-gray-400">({course.courseRatings.length})</span>
        </div>
        <p className="font-semibold text-sm sm:text-base md:text-lg">{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default CoursesCard;
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const CoursesCard = ({ course }) => {
  const { currency } = useContext(AppContext)
  const getStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? "text-orange-400" : "text-gray-300"}>
        ★
      </span>
    ));
  return (
    <div className="w-60 rounded-xl border border-gray-500/50 shadow-sm overflow-hidden">
      <img src={course.image} alt={course.title} className="w-full h-36 object-cover" />
      <div className="p-3 flex items-start flex-col">
        <h3 className="font-bold text-lg leading-tight">{course.title}</h3>
        <p className="text-gray-500 text-sm mb-2">{course.instructor}</p>
        <div className="flex items-start text-sm space-x-1 mb-1">
          <span className="font-semibold">{course.rating}</span>
          <div className="flex">{getStars(course.rating)}</div>
          <span className="text-gray-400">({course.reviews})</span>
        </div>
        <p className="font-semibold text-lg">{currency}{(course.price - course.discount * course.price / 100).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CoursesCard;
import React, { useContext, useEffect, useState } from "react";
import Switch from "../../components/educator/Switch";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import axiosInstance from "../../utils/axios.js";

export default function MyCourses() {
  const { currency, allCourses } = useContext(AppContext)
  const [courses, setCourses] = useState(null)

  const fetchEducatorCourses = async () => {
    try {
      const res = await axiosInstance.get("/educator/courses")
      setCourses(res?.data?.courses)
    } catch (error) {
      console.log('Error Fetching my-courses :', error.message);
    }
  }
  useEffect(() => {
    fetchEducatorCourses()
  }, [allCourses])

  if (!courses) {
    return <Loading />
  }

  return (
    <div className="p-4 box-border sm:p-6 lg:p-10 w-full mx-auto max-w-[100vw] overflow-hidden">
      <h1 className="text-xl font-semibold mb-6">My Courses</h1>
      <div className="overflow-x-auto">
        <div className="w-full bg-white rounded-lg border min-w-[300px]">
          {/* Header Row */}
          <div className="grid grid-cols-12 font-semibold text-sm px-4 sm:px-6 py-3 border-b">
            <span className="col-span-6 sm:col-span-5 md:col-span-2">All Courses</span>
            <span className="col-span-3 sm:col-span-2 text-center hidden sm:block">Earnings</span>
            <span className="col-span-3 sm:col-span-2 text-center hidden sm:block">Students</span>
            <span className="col-span-3 sm:col-span-2 text-center hidden sm:block">Date</span>
            <span className="col-span-6 sm:col-span-3 text-center hidden sm:block">Status</span>
          </div>

          {/* Mobile Header - Shows labels for data cells */}
          <div className="sm:hidden grid grid-cols-12 font-semibold text-xs px-4 py-2 border-b bg-gray-50">
            <span className="col-span-6">Course</span>
            <span className="col-span-3 text-center">Earnings</span>
            <span className="col-span-3 text-center">Students</span>
          </div>

          {courses.map((course) => (
            <div
              key={course._id}
              className="grid grid-cols-12 items-center px-4 sm:px-6 py-3 border-b text-sm gap-2 hover:bg-gray-50"
            >
              {/* Course Title & Image - Takes more space on mobile */}
              <div className="flex items-center gap-3 col-span-6 sm:col-span-5 md:col-span-2">
                <img
                  src={course.courseThumbnail}
                  alt="thumbnail"
                  className=" h-10 max-sm:w-12 sm:h-12 rounded-md object-cover flex-shrink-0"
                />
                <span className="font-medium line-clamp-2 text-xs sm:text-sm">
                  {course.courseTitle}
                </span>
              </div>

              {/* Earnings - Compact on mobile */}
              <div className="col-span-3 sm:col-span-2 text-center">
                <div className="sm:hidden text-xs text-gray-500 mb-1">Earnings</div>
                <span className="font-medium">{currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}</span>
              </div>

              {/* Students - Compact on mobile */}
              <div className="col-span-3 sm:col-span-2 text-center">
                <div className="sm:hidden text-xs text-gray-500 mb-1">Students</div>
                <span className="font-medium">{course.enrolledStudents?.length}</span>
              </div>
              {/* Date - Compact on mobile */}
              <div className="col-span-4 flex items-center justify-center gap-2 sm:col-span-2 text-center">
                <div className="sm:hidden text-sm  text-gray-500 ">Date:</div>
                <span className="font-medium">{new Date(course.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Status - Always visible */}
              <div className="col-span-8 sm:col-span-3 mt-2 sm:mt-0 flex items-center  sm:justify-center px-2 justify-end gap-x-2">
                <Switch checked={course.isPublished} />
                <span className="text-xs hidden lg:block">
                  {course.live ? "Live" : "Private"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
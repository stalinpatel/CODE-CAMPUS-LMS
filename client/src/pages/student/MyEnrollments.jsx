import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";
import Spinner from '../../components/student/Spinner';
import axiosInstance from '../../utils/axios';

const MyEnrollments = () => {
  const { enrolledCourses, calculateTotalCourseDuration, navigate, fetchingEnrolledCourses } = useContext(AppContext);
  const [progressArray, setProgressArray] = useState([]);
  const calculateTotalLecturesCount = (course) => {
    // console.log('courseContent:', course);
    let lectureCount = 0;
    course?.courseContent.map((chapter) => {
      lectureCount += chapter?.chapterContent?.length;
    })
    return { _id: course._id, lectureCount };
  }
  const fetchCompletedLecturesCount = async () => {
    try {
      const results = await Promise.all(
        enrolledCourses.map(async (course) => {
          const res = await axiosInstance.post("/user/get-course-progress", { courseId: course._id });
          return res.data?.progressData;
        })
      );
      return results;
    } catch (err) {
      console.error("Failed to fetch course progress", err);
      return []; // fallback to empty array
    }
  };


  useEffect(() => {
    const fetchProgressData = async () => {
      if (enrolledCourses && enrolledCourses.length > 0) {
        // 1. Get total lectures from each course
        const totalLecturesCountArray = enrolledCourses.map(course => {
          return calculateTotalLecturesCount(course);
        });

        // 2. Await completed lecture data from backend
        const completedProgressArray = await fetchCompletedLecturesCount();

        // 3. Map progress data into format expected by progressArray
        const updatedProgressArray = totalLecturesCountArray.map((course, index) => ({
          lectureCompleted: completedProgressArray[index]?.lectureCompleted?.length || 0,
          totalLectures: course.lectureCount,
        }));

        setProgressArray(updatedProgressArray);
      }
    };

    fetchProgressData(); // invoke async function
  }, [enrolledCourses]);



  if (fetchingEnrolledCourses) {
    return (<>
      <div className='px-4 sm:px-8 md:px-36 pt-10 h-80'>
        <h1 className='text-xl sm:text-2xl font-semibold mb-6'>My Enrollments</h1>

        <div className='w-full mx-auto my-10 flex items-center justify-center '>
          <Spinner classNames="scale-150" />
        </div>
      </div >
    </>)
  }

  return (
    <>
      <div className='px-4 sm:px-8 md:px-36 pt-10'>
        <h1 className='text-xl sm:text-2xl font-semibold mb-6'>My Enrollments</h1>

        {/* Desktop Table */}
        <div className='hidden sm:block'>
          {
            !fetchingEnrolledCourses && enrolledCourses && enrolledCourses.length === 0 &&
            (<h1 className='text-gray-700 text-xl text-center my-10 mx-auto '>No Course Enrolled</h1>)
          }
          <table className='w-full table-auto border rounded-xl overflow-hidden'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-4 py-3 text-left font-semibold'>Course</th>
                <th className='px-4 py-3 text-left font-semibold'>Duration</th>
                <th className='px-4 py-3 text-left font-semibold'>Completed</th>
                <th className='px-4 py-3 text-left font-semibold'>Status</th>
              </tr>
            </thead>

            <tbody className='text-gray-700'>

              {enrolledCourses.map((course, index) => (
                <tr key={index} className='border-b border-gray-300'>
                  <td className='px-4 py-3 flex items-center gap-3'>
                    <img src={course.courseThumbnail} alt="thumbnail" className='w-24 rounded-md' />
                    <div className='flex-1'>
                      <p className='font-medium'>{course.courseTitle}</p>
                      <Line
                        strokeWidth={2}
                        percent={
                          progressArray[index]
                            ? (progressArray[index].lectureCompleted / progressArray[index].totalLectures) * 100
                            : 0
                        }
                        className='bg-gray-300 rounded-full mt-1'
                      />
                    </div>
                  </td>
                  <td className='px-4 py-3'>
                    {calculateTotalCourseDuration(course)}
                  </td>
                  <td className='px-4 py-3'>
                    {progressArray[index] &&
                      `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`}{" "}
                    <span className='text-sm text-gray-500'>Lectures</span>
                  </td>
                  <td className='px-4 py-3'>
                    <button
                      onClick={() => navigate("/player/" + course._id)}
                      className={`w-24 sm:w-28 px-3 py-2  text-sm text-white rounded-lg  transition-all duration-200 ${progressArray[index] && progressArray[index].lectureCompleted === progressArray[index].totalLectures
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                        } `}
                    >
                      {progressArray[index] && progressArray[index].lectureCompleted === progressArray[index].totalLectures
                        ? "Completed"
                        : "On Going"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className='sm:hidden space-y-6'>
          {
            !fetchingEnrolledCourses && enrolledCourses && enrolledCourses.length === 0 &&
            (<h1 className='text-gray-700 text-xl text-center my-10 mx-auto '>No Course Enrolled</h1>)
          }
          {enrolledCourses.map((course, index) => (
            <div key={index} className='border rounded-lg p-4 shadow-sm'>
              <div className='flex gap-4 mb-2'>
                <img src={course.courseThumbnail} alt="thumbnail" className='w-20 h-20 rounded-md object-cover' />
                <div className='w-full'>
                  <p className='font-medium text-sm '>{course.courseTitle}</p>
                  <Line
                    strokeWidth={2}
                    percent={
                      progressArray[index]
                        ? (progressArray[index].lectureCompleted / progressArray[index].totalLectures) * 100
                        : 0
                    }
                    className='bg-gray-300 rounded-full mt-1'
                  />
                </div >
              </div >
              <div className='text-sm text-gray-700 mb-1'>
                Duration: <span className='font-medium'>{calculateTotalCourseDuration(course)}</span>
              </div>
              <div className='text-sm text-gray-700 mb-2'>
                Progress: <span className='font-medium'>{progressArray[index]?.lectureCompleted}/{progressArray[index]?.totalLectures} Lectures</span>
              </div>
              <button
                onClick={() => navigate("/player/" + course._id)}
                className={`w-full py-2 text-sm  text-white rounded-lg  ${progressArray[index] && progressArray[index].lectureCompleted === progressArray[index].totalLectures
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
                  } text - white transition - colors duration - 200`}
              >
                {
                  progressArray[index] && progressArray[index].lectureCompleted === progressArray[index].totalLectures
                    ? "Completed"
                    : "On Going"
                }
              </button >
            </div >
          ))}
        </div >
      </div >
      <Footer />
    </>
  );
};

export default MyEnrollments;

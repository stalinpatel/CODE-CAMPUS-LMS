// import React, { useContext, useState } from 'react';
// import { AppContext } from '../../context/AppContext';
// import { Line } from "rc-progress"
// import Footer from "../../components/student/Footer"
// const MyEnrollments = () => {
//   const { enrolledCourses, calculateTotalCourseDuration, navigate } = useContext(AppContext)
//   const [progressArray, setProgressArray] = useState(
//     [
//       {
//         lectureCompleted: 2,
//         totalLectures: 4
//       },
//       {
//         lectureCompleted: 5,
//         totalLectures: 10
//       },
//       {
//         lectureCompleted: 0,
//         totalLectures: 3
//       },
//       {
//         lectureCompleted: 7,
//         totalLectures: 7
//       },
//       {
//         lectureCompleted: 1,
//         totalLectures: 5
//       },
//       {
//         lectureCompleted: 9,
//         totalLectures: 12
//       },
//       {
//         lectureCompleted: 3,
//         totalLectures: 8
//       },
//       {
//         lectureCompleted: 6,
//         totalLectures: 6
//       },
//       {
//         lectureCompleted: 0,
//         totalLectures: 6
//       },
//       {
//         lectureCompleted: 4,
//         totalLectures: 4
//       },
//       {
//         lectureCompleted: 2,
//         totalLectures: 7
//       },
//       {
//         lectureCompleted: 8,
//         totalLectures: 10
//       }
//     ])
//   return (
//     <>
//       <div className='px-8 md:px-36 pt-10 '>
//         <h1 className='text-2xl font-semibold'>My Enrollments</h1>
//         <table className='md:table-auto table-fixed w-full overflow-hidden border  rounded-xl mt-10'>
//           <thead>
//             <tr>
//               <th className='px-4 py-3 font-semibold truncate'>Couse</th>
//               <th className='px-4 py-3 font-semibold truncate'>Duration</th>
//               <th className='px-4 py-3 font-semibold truncate'>Completed</th>
//               <th className='px-4 py-3 font-semibold truncate'>Status</th>
//             </tr>
//           </thead>
//           <tbody className='text-gray-700 '>
//             {
//               enrolledCourses.map((course, index) => {
//                 return (
//                   <tr key={index} className='border-b border-gray-500/20'>
//                     <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
//                       <img src={course.courseThumbnail} alt="thumbnail" className='w-14 sm:w-24 md:w-28' />
//                       <div className='flex-1 '>
//                         <p className='flex-1 max-sm:text-sm'>{course.courseTitle}</p>
//                         <Line strokeWidth={2} percent={
//                           progressArray[index]
//                             ? (progressArray[index].lectureCompleted / progressArray[index].totalLectures) * 100
//                             : 0
//                         } className='bg-gray-300 rounded-full' />
//                       </div>
//                     </td>
//                     <td className='px-4 py-3 max-sm:hidden'>
//                       {calculateTotalCourseDuration(course)}
//                     </td>
//                     <td className='px-4 py-3 max-sm:hidden'>
//                       {
//                         progressArray[index] && `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`
//                       } <span>Lectures</span>
//                     </td>
//                     <td className='px-4 py-3 text-center sm:text-left'>
//                       <button
//                         onClick={() => navigate("/player/" + course._id)}
//                         className='w-24 sm:w-28 px-2 sm:px-5 py-1.5 sm:py-2 bg-blue-600 text-xs sm:text-sm text-white box-border rounded-lg hover:bg-blue-800 transition-all duration-200'
//                       >
//                         {progressArray[index] && progressArray[index].lectureCompleted === progressArray[index].totalLectures
//                           ? "Completed"
//                           : "On Going"}
//                       </button>
//                     </td>

//                   </tr>
//                 )
//               })
//             }
//           </tbody>
//         </table>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MyEnrollments;   
import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";

const MyEnrollments = () => {
  const { enrolledCourses, calculateTotalCourseDuration, navigate } = useContext(AppContext);
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 5, totalLectures: 10 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 7, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 9, totalLectures: 12 },
    { lectureCompleted: 3, totalLectures: 8 },
    { lectureCompleted: 6, totalLectures: 6 },
    { lectureCompleted: 0, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 7 },
    { lectureCompleted: 8, totalLectures: 10 }
  ]);

  return (
    <>
      <div className='px-4 sm:px-8 md:px-36 pt-10'>
        <h1 className='text-xl sm:text-2xl font-semibold mb-6'>My Enrollments</h1>

        {/* Desktop Table */}
        <div className='hidden sm:block'>
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

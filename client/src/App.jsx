import React from 'react';

import { Route, Routes, useMatch } from 'react-router-dom';
import Home from "./pages/student/Home"
import CoursesList from "./pages/student/CoursesList"
import CourseDetails from "./pages/student/CourseDetails"
import MyEnrollments from "./pages/student/MyEnrollments"
import Player from "./pages/student/Player"
import Loading from "./components/student/Loading"
import Dashbord from "./pages/educator/Dashbord"
import AddCourse from "./pages/educator/AddCourse"
import Educator from "./pages/educator/Educator"
import StudentsEnrolled from "./pages/educator/StudentsEnrolled"
import MyCourses from './pages/educator/MyCourses';
import StudentNavbar from './components/student/Navbar';
import educatorNavbar from './components/educator/Navbar';


const App = () => {
  const isEducatorRoute = useMatch('/educator/*')


  return (
    <div className='text-default min-h-screen bg-white'>
      {/* {
        isEducatorRoute ? <educatorNavbar /> : <studentNavbar />
      } */}
      {
        !isEducatorRoute && <StudentNavbar />
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CoursesList />} />
        <Route path='/course-list/:input' element={<CoursesList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrollments/:id' element={<MyEnrollments />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />

        <Route path='/educator' element={<Educator />}>
          <Route path='educator' element={<Dashbord />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='student-enrolled' element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;


/*
ADDED
1-fixed testmonial padding issue
2-
3-
4-
5-
6- 

 */
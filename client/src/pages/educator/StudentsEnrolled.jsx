import React, { useEffect, useState } from "react";

import { dummyStudentEnrolled } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import axiosInstance from "../../utils/axios.js";



const StudentsEnrolled = () => {
    const [enrolledStudents, setEnrolledStudents] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchEnrolledStudents = async () => {
        try {
            setLoading(true)
            const res = await axiosInstance.get("/educator/enrolled-students")
            setEnrolledStudents(res?.data.enrolledStudents)
        } catch (error) {
            console.log('Error Fetching enrolled students :', error.message);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchEnrolledStudents()
    }, [])


    // Format date function
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    if (!loading && enrolledStudents?.length === 0) {
        return (
            <>
                <h1 className="text-center mx-auto text-gray-700 py-40">No Students Enrolled </h1>
            </>
        )
    }
    if (loading) {
        return <Loading />
    }
    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full mx-auto ">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Student Enrollments</h1>
                <p className="text-gray-600 mt-1">List of all enrolled students</p>
            </div>

            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                {/* Desktop Table View */}
                <div className="overflow-x-auto hidden sm:block">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Student
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Course Title
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Enrollment Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {enrolledStudents.map((enrollment, index) => (
                                <tr key={`${enrollment.student._id}-${index}`} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={enrollment.student.imageUrl}
                                                    alt={enrollment.student.name}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {enrollment.student.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 max-w-xs truncate">
                                            {enrollment.courseTitle}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(enrollment.purchaseDate)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile List View */}
                <div className="sm:hidden">
                    {enrolledStudents.map((enrollment, index) => (
                        <div key={`${enrollment.student._id}-${index}`} className="border-b p-4">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                                <span className="text-sm text-gray-500">
                                    {formatDate(enrollment.purchaseDate)}
                                </span>
                            </div>
                            <div className="flex items-center mt-2">
                                <img
                                    className="h-8 w-8 rounded-full mr-3"
                                    src={enrollment.student.imageUrl}
                                    alt={enrollment.student.name}
                                />
                                <h3 className="text-md font-semibold">{enrollment.student.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mt-2 truncate">
                                {enrollment.courseTitle}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default StudentsEnrolled
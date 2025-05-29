import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { dummyDashboardData } from '../../assets/assets';
import assets from '../../assets/assets.js';
import Loading from '../../components/student/Loading';
import axiosInstance from '../../utils/axios.js';

const Dashbord = () => {
    const [dashbordData, setDashbordData] = useState(null);
    const { currency } = useContext(AppContext);


    const fetchDashbordData = async () => {
        try {
            const res = await axiosInstance.get("/educator/dashboard")

            setDashbordData(res?.data?.dashboardData)
        } catch (error) {
            console.log('Error Fetching Dashbord data :', error.message);
            // setDashbordData(dummyDashboardData);
        }
    };

    useEffect(() => {
        fetchDashbordData();
    }, []);

    if (!dashbordData) {
        return <Loading />;
    }

    return (
        <div className="p-6 space-y-6">
            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center p-4 bg-white shadow rounded-xl space-x-4">
                    {/* <div className="text-3xl">👨‍🏫</div> */}
                    <img src={assets.appointmentsIcon} alt="enrollments" />
                    <div>
                        <div className="text-xl font-bold">{dashbordData.enrolledStudentsData?.length}</div>
                        <div className="text-gray-500 text-sm">Total Enrolments</div>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white shadow rounded-xl space-x-4">
                    {/* <div className="text-3xl">📘</div> */}
                    <img src={assets.patientsIcon} alt="courses" />
                    <div>
                        <div className="text-xl font-bold">{dashbordData?.totalCourses}</div>
                        <div className="text-gray-500 text-sm">Total Courses</div>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white shadow rounded-xl space-x-4">
                    {/* <div className="text-3xl">💰</div> */}
                    <img src={assets.earningIcon} alt="earning icon" />
                    <div>
                        <div className="text-xl font-bold">{currency}{dashbordData?.totalEarnings}</div>
                        <div className="text-gray-500 text-sm">Total Earnings</div>
                    </div>
                </div>
            </div>

            {/* Enrolments Table */}
            <div className="bg-white shadow rounded-xl p-4">
                <h2 className="text-lg font-semibold mb-4">Latest Enrolments</h2>

                {/* Mobile Cards */}
                <div className="sm:hidden space-y-4">
                    {dashbordData.enrolledStudentsData?.map((enroll, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-3 mb-2">
                                <img src={enroll.students.imageUrl} alt="avatar" className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-medium text-gray-800">{enroll.students.name}</p>
                                    <p className="text-sm text-gray-500">11/03/25</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-700 font-semibold">{enroll.courseTitle}</p>
                        </div>
                    ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="text-left text-sm font-medium text-gray-500 p-2">#</th>
                                <th className="text-left text-sm font-medium text-gray-500 p-2">Student name</th>
                                <th className="text-left text-sm font-medium text-gray-500 p-2">Course Title</th>
                                <th className="text-left text-sm font-medium text-gray-500 p-2">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {dashbordData.enrolledStudentsData?.map((enroll, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="p-2 text-sm text-gray-700">{idx + 1}</td>
                                    <td className="p-2 flex items-center space-x-2">
                                        <img src={enroll.students.imageUrl} alt="avatar" className="w-8 h-8 rounded-full" />
                                        <span className="text-sm text-gray-800">{enroll.students.name}</span>
                                    </td>
                                    <td className="p-2 text-sm text-gray-800">{enroll.courseTitle}</td>
                                    <td className="p-2 text-sm text-gray-600">22/03/25</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashbord;

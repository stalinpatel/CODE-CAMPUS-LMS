import { createContext, useEffect, useState } from "react";
import { courses } from "../assets/assets";
import { useFetcher, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react"
import axiosInstance from "../utils/axios.js";

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const { user } = useUser();

    useEffect(() => {
        const setupInterceptor = () => {
            const interceptor = axiosInstance.interceptors.request.use(
                async (config) => {
                    const token = await getToken();
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

            // Optional cleanup to prevent duplicate interceptors
            return () => axiosInstance.interceptors.request.eject(interceptor);
        };

        const cleanup = setupInterceptor();
        return cleanup;
    }, [getToken]);


    const [allCourses, setAllCourses] = useState([])
    const [userData, setUserData] = useState(null)
    const [isEducator, setIsEducator] = useState(false)
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [enrollLoading, setEnrollLoading] = useState(false)
    const [paymentDetails, setPaymentDetails] = useState({
        orderId: "",
        receiptId: "",
        amount: 0,
        status: "Initiated",
        paidAt: "",
    })
    const [orderDetails, setOrderDetails] = useState({
        orderId: "",
        receiptId: "",
        amountInPaise: "",
        status: "created",
        courseId: ""
    })

    useEffect(() => {
        console.log('orderdetails', orderDetails);
    }, [orderDetails])

    // FETCH ALL COURSES
    const fetchAllCourses = async () => {
        try {
            const res = await axiosInstance.get("/course/all")
            setAllCourses(res?.data?.courses)
        } catch (error) {
            console.log('Error in fetchAllCourses ', error);
        }
    }

    //FETCH USER DATA   
    const fetchUserData = async () => {
        if (user?.publicMetadata.role === 'educator') {
            setIsEducator(true)
        }
        try {
            const res = await axiosInstance.get("/user/data")
            setUserData(res?.data?.user)
        } catch (error) {
            console.log('Error in fetchUserData ', error);
        }
    }

    //FETCH USER ENROLLED COURSES
    const fetchEnrolledCourses = async () => {
        try {
            const res = await axiosInstance.get('/user/enrolled-courses')
            setEnrolledCourses(res?.data?.enrolledCourses)
        } catch ([error]) {
            console.log("Error in fetching enrolled courses:", error)
        }
    }




    useEffect(() => {
        fetchAllCourses()
    }, [])

    useEffect(() => {
        if (user) {
            fetchUserData()
            fetchEnrolledCourses();
        }
    }, [user])

    const getStars = (count) =>
        Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < count ? "text-orange-400" : "text-gray-300"}>
                ★
            </span>
        ));
    const getRating = (ratingsArray) => {
        const totalLength = ratingsArray.length;
        const totalStars = ratingsArray.reduce((sum, user) => sum + user.rating, 0)
        return Math.floor(totalLength === 0 ? 0 : totalStars / totalLength);
    }
    const getRatingDetails = (ratingsArray) => {
        const average = getRating(ratingsArray);
        const starsCount = Math.floor(average);
        return {
            starsCount,
            printStars: getStars(starsCount),
            reviewsCount: ratingsArray.length
        };
    };
    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (hours > 0 && minutes > 0) {
            return `${hours} hr ${minutes} min`;
        } else if (hours > 0) {
            return `${hours} hr`;
        } else if (minutes > 0) {
            return `${minutes} min`;
        } else {
            return `${seconds} sec`;
        }
    };
    const getPriceDetails = (courseData) => {
        return {
            originalPrice: currency + (courseData.coursePrice).toFixed(2),
            discountInPercentage: courseData.discount.toFixed(2),
            discountPrice: currency + courseData.coursePrice * courseData.discount.toFixed(2),
            discountedPrice: currency + (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)
        }
    }
    const handlePlural = (value, output) => {
        if (value <= 1) {
            return output;
        } else {
            return output + "s"
        }
    }
    const calculateTotalCourseDuration = (courseData) => {
        if (!courseData || courseData.courseContent.length === 0) {
            return "0h 0m";
        }

        let totalSeconds = 0;

        courseData.courseContent.forEach((chapter, index) => {
            const chapterSeconds = chapter.chapterContent.reduce((sum, lecture) => {
                return sum + lecture.lectureDuration;
            }, 0);
            totalSeconds += chapterSeconds;
        });
        const courseDuration = formatDuration(totalSeconds)
        return courseDuration;
    };
    const calculatePlaybackDetails = (courseData) => {
        if (!courseData || courseData?.courseContent?.length === 0) {
            return { hours: 0, minutes: 0, chapterWiseDuration: [] };
        }

        const chapterWiseDuration = [];
        let totalSeconds = 0;
        let lessonCount = 0;

        courseData.courseContent.forEach((chapter, index) => {
            const chapterSeconds = chapter.chapterContent.reduce((sum, lecture) => {
                lessonCount++;
                return sum + lecture.lectureDuration;
            }, 0);
            chapterWiseDuration[index] = chapterSeconds;
            totalSeconds += chapterSeconds;
        });


        return {
            lessonCount,
            sectionsCount: courseData.courseContent.length,
            courseDuration: totalSeconds,
            chapterWiseDuration,
        };
    };

    const value = {
        currency, allCourses, navigate, isEducator, formatDuration, setIsEducator, getRatingDetails, getStars, getRating, handlePlural, getPriceDetails, enrolledCourses, calculateTotalCourseDuration, calculatePlaybackDetails, userData, setUserData, enrollLoading, setEnrollLoading, setOrderDetails
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

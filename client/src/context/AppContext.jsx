import { createContext, useEffect, useState } from "react";
import { courses } from "../assets/assets";
import { useFetcher, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react"
import axios from "../utils/axios.js";

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const { user } = useUser();


    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setIsEducator] = useState(true)
    const [enrolledCourses, setEnrolledCourses] = useState([])

    const fetchAllCourses = async () => {
        setAllCourses(courses)
        // try {
        //     const res = await axios.get("/course/all")
        //     console.log('res:', res);

        // } catch (error) {
        //     console.log('Error in fetchAllCourses ', error);
        // }
    }
    const fetchEnrolledCourses = async () => {
        console.log('enrolled courses fetched');

        setEnrolledCourses(courses)
    }
    const logToken = async () => {
        console.log("Token : ", await getToken());
    }
    useEffect(() => {
        fetchAllCourses(),
            fetchEnrolledCourses();
    }, [])
    // useEffect(() => {
    //     if (user) {
    //         logToken();
    //     }
    // }, [user])

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
        if (!courseData || courseData.courseContent.length === 0) {
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
        currency, allCourses, navigate, isEducator, formatDuration, setIsEducator, getRatingDetails, getStars, getRating, handlePlural, getPriceDetails, enrolledCourses, calculateTotalCourseDuration, calculatePlaybackDetails
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

import { createContext, useEffect, useState } from "react";
import { courses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setIsEducator] = useState(true)

    const fetchAllCourses = async () => {
        setAllCourses(courses)
    }
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

    useEffect(() => { fetchAllCourses() }, [])


    const value = {
        currency, allCourses, navigate, isEducator, formatDuration, setIsEducator, getRatingDetails, getStars, getRating, handlePlural, getPriceDetails
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
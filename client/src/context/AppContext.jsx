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

    useEffect(() => { fetchAllCourses() }, [])


    const value = {
        currency, allCourses, navigate, isEducator, setIsEducator, getStars
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
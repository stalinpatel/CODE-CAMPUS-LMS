import { createContext, useEffect, useState } from "react";
import { courses } from "../assets/assets";

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const [allCourses, setAllCourses] = useState([])

    const fetchAllCourses = async () => {
        setAllCourses(courses)
    }


    useEffect(() => { fetchAllCourses() }, [])


    const value = {
        currency, allCourses
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
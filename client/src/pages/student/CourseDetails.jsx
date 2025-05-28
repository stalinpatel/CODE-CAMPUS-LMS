import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import assets from '../../assets/assets';
import YouTube from "react-youtube"
import CourseDetailsSkeleton from "../../components/student/CourseDetailsSkeleton"
import Footer from '../../components/student/Footer';
import Spinner from '../../components/student/Spinner';
import axiosInstance from '../../utils/axios';

const CourseDetails = () => {
    const { id } = useParams();
    const { allCourses, getRatingDetails, formatDuration, handlePlural, getPriceDetails, calculatePlaybackDetails } = useContext(AppContext)
    const [openedContents, setOpenedContents] = useState([])
    const [courseData, setCourseData] = useState(null)
    const [isEnrolled, setIsEnrolled] = useState(false)
    const [playerData, setPlayerData] = useState(null)
    const [isPlayerLoading, setIsPlayerLoading] = useState(true);
    const fetchCourseData = async (id) => {
        try {
            const res = await axiosInstance.get(`course/${id}`)
            setCourseData(res?.data?.courseData);
        } catch (error) {
            console.log('Error in geting Course Details', error);
        }
    }
    useEffect(() => {
        if (allCourses && allCourses.length > 0) {
            fetchCourseData(id)
        }
    }, [allCourses, id]); // 👈 Add dependencies so it re-runs when allCourses is ready


    const toggleDropdown = (chapterId) => {
        setOpenedContents((prev) =>
            prev.includes(chapterId)
                ? prev.filter((id) => id !== chapterId)
                : [...prev, chapterId]
        );
    };

    const truncateHTML = (html, limit) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        const text = div.textContent || div.innerText || "";

        const trimmed = text.slice(0, limit);
        const lastSpace = trimmed.lastIndexOf(" ");
        return text.slice(0, lastSpace) + "...";
    };

    const handlePreviewClick = (url) => {
        setPlayerData({
            videoId: url.split('/').pop()
        })
    }
    const handleEnrollClick = () => {
        console.log('Enroll clicked');
    }

    const ratingDetails = courseData ? getRatingDetails(courseData.courseRatings) : null;
    const priceDetails = courseData ? getPriceDetails(courseData) : null;
    const playbackDetails = courseData ? calculatePlaybackDetails(courseData) : null


    if (!courseData) {
        return <CourseDetailsSkeleton />
    }
    // if (true) {
    //     return <Spinner />
    // }


    return (
        <>
            <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start  justify-between md:px-36 px-8 md:pt-20 pt-10 text-left z-2">
                <div className="absolute top-0 left-0 w-full h-2/4 bg-gradient-to-b from-cyan-100/70 z-0 "></div>
                <div className="max-w-xl z-10 text-gray-500">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">{courseData?.courseTitle}</h1>
                    <div className="pt-4 md:text-base text-sm"
                        dangerouslySetInnerHTML={{ __html: truncateHTML(courseData.courseDescription, 200) }}
                    >
                    </div>
                    <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
                        <p>{ratingDetails.starsCount}</p>
                        <div className="flex text-xl">
                            {
                                ratingDetails.printStars
                            }
                        </div>
                        <p className="text-blue-600">({ratingDetails?.reviewsCount} {handlePlural(ratingDetails.reviewsCount, "rating")})</p>
                        <p>{courseData?.enrolledStudents?.length} {
                            handlePlural(courseData?.enrolledStudents?.length, "student")
                        }</p>
                    </div>
                    <a href='/' className="text-sm">Course by <span className="text-blue-600 underline">GreatStack</span></a>
                    <div className="pt-8 text-gray-800">
                        <h2 className="text-xl font-semibold">Course Structure</h2>
                        <div className=' text-gray-600 text-sm pt-2' >
                            <span>{playbackDetails.sectionsCount} {handlePlural(playbackDetails.sectionsCount, "section")}</span>
                            <span className='px-2 '>&middot;</span>
                            <span>{playbackDetails.lessonCount} {handlePlural(playbackDetails.lessonCount, "lecture")}</span>
                            <span className='px-2 '>&middot;</span>
                            <span>{formatDuration(playbackDetails.courseDuration)}</span>
                        </div>
                        <div className="pt-5">
                            {
                                courseData?.courseContent && courseData.courseContent.map((chapter, chapterCount) => {
                                    return (
                                        <div key={chapter.chapterId} className="border border-gray-300 bg-gray-100/50 mb-2 rounded">
                                            <div onClick={() => toggleDropdown(chapter.chapterId)} className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                                                <div className="flex items-center gap-2 ">
                                                    <img src={assets.downArrowIcon} alt="arrow icon" className={`transform transition-transform ${openedContents.includes(chapter.chapterId) ? 'rotate-180' : ""}`} />
                                                    <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                                                </div>
                                                <p className="text-sm md:text-default">{formatDuration(playbackDetails.chapterWiseDuration[chapterCount])}</p>
                                            </div>
                                            <div className={`overflow-hidden transition-all duration-300 ${openedContents.includes(chapter.chapterId) ? 'max-h-96' : " max-h-0"} `}>
                                                <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 bg-white border-t border-gray-300">
                                                    {
                                                        chapter.chapterContent.map((lecture) => {
                                                            return (
                                                                <li key={lecture?.lectureId} className="flex items-start gap-2 py-1">
                                                                    <img src={assets.playIcon} alt="bullet icon" className="w-4 h-4 mt-1" />
                                                                    <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                                                                        <p>{lecture.lectureTitle}</p>
                                                                        <div onClick={() => handlePreviewClick(lecture.lectureUrl)} className="flex gap-2">
                                                                            {lecture.isPreviewFree && <p className="text-blue-500 cursor-pointer">Preview</p>}
                                                                            <p>{formatDuration(lecture.lectureDuration)}</p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="py-20 text-black">
                        <h3 className="text-xl font-semibold ">Course Description</h3>
                        <div className="mt-8 ">

                            <div className='text-gray-600/80 rich-text'
                                dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" z-10  rounded-t-2xl  md:rounded-lg overflow-hidden w-full lg:w-132 sm:min-w-96 bg-white  shadow-gray-300/70 shadow-lg ">
                    {
                        playerData
                            ? <div className="relative w-full aspect-video ">
                                {isPlayerLoading && (
                                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-10">
                                        <img src={courseData.courseThumbnail} alt="loading thumbnail" className="w-full h-full object-cover absolute inset-0" />
                                        <div className="z-20 bg-white/70 backdrop-blur-sm p-3 rounded">
                                            <Spinner />
                                        </div>
                                    </div>
                                )}
                                <YouTube
                                    className={`transition-opacity duration-300 ${isPlayerLoading ? 'opacity-0' : 'opacity-100'}`}
                                    videoId={playerData.videoId}
                                    opts={{ playerVars: { autoplay: 1, mute: 1 } }}
                                    iframeClassName='w-full aspect-video'
                                    onReady={() => setIsPlayerLoading(false)}
                                />
                            </div>
                            : <img className='aspect-video' src={courseData.courseThumbnail} alt="thumbnail" />
                    }
                    <div className="p-5">
                        <div className="flex items-center gap-2">
                            <img className="w-3.5" src={assets.timeLeftClockIcon} alt="time left clock icon" />
                            <p className="text-red-500" >
                                <span className="font-medium">5 days</span> left at this price!
                            </p>
                        </div>
                        <div className="flex gap-3 items-center pt-2">
                            <p className="text-gray-800 md:text-4xl text-2xl font-semibold">{priceDetails.discountedPrice}</p>
                            <p className="md:text-lg text-gray-500 line-through">{priceDetails.originalPrice}</p>
                            <p className="md:text-lg text-gray-500">{priceDetails.discountInPercentage}% off</p>
                        </div>
                        <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
                            <div className="flex items-center gap-1">
                                <img src={assets.ratingStar} alt="star icon" />
                                <p>{ratingDetails.starsCount}</p>
                            </div>
                            <div className="h-4 w-px bg-gray-500/40"  >
                            </div>
                            <div className="flex items-center gap-1">
                                <img src={assets.timeClockIcon} alt="clock icon" />
                                <p>{formatDuration(playbackDetails.courseDuration)}</p>
                            </div>
                            <div className="h-4 w-px bg-gray-500/40">
                            </div>
                            <div className="flex items-center gap-1">
                                <img src={assets.lessonIcon} alt="clock icon" />
                                <p>{playbackDetails.lessonCount} {handlePlural(playbackDetails.lessonCount, "lesson")}</p>
                            </div>
                        </div>
                        <button
                            disabled={isEnrolled}
                            onClick={() => handleEnrollClick()}
                            className={`md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium ${isEnrolled ? "cursor-not-allowed" : "cursor-pointer"}`}>{isEnrolled ? "Already Enrolled" : "Enroll Now"}
                        </button>
                        <div className="pt-6">
                            <p className="md:text-xl text-lg font-medium text-gray-800">What's in the course?</p>
                            <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
                                <li>Lifetime access with free updates.</li>
                                <li>Step-by-step, hands-on project guidance.</li>
                                <li>Downloadable resources and source code.</li>
                                <li>Quizzes to test your knowledge.</li>
                                <li>Certificate of completion.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />``
        </>
    );
}

export default CourseDetails;
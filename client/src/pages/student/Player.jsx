import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import assets from '../../assets/assets';
import Spinner from '../../components/student/Spinner';
import YouTube from "react-youtube"
import Footer from '../../components/student/Footer';
import Rating from "../../components/student/Rating"
import axiosInstance from '../../utils/axios';
import { toast } from "react-toastify"
import ConfirmModal from '../../components/student/ConfirmModal';

const Player = () => {
  const { courseId } = useParams();
  const { enrolledCourses, calculatePlaybackDetails, formatDuration, handlePlural, getRatingDetails, userData } = useContext(AppContext)
  const [courseData, setCourseData] = useState(null)
  const [playerData, setPlayerData] = useState(null)
  const [openedContents, setOpenedContents] = useState([])
  const [isPlayerLoading, setIsPlayerLoading] = useState(true);
  const [ratingOngoing, setRatingOngoing] = useState(false)
  const [markCompletedLoader, setMarkCompletedLoader] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentPlayingLectureId, setCurrentPlayingLectureId] = useState(null)
  const [courseProgressData, setCourseProgressData] = useState(null)
  const [initialRating, setInitialRating] = useState(0)
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  useEffect(() => {
    if (enrolledCourses && enrolledCourses.length > 0) {
      const findCourse = enrolledCourses.find(course => course._id === courseId);
      setCourseData(findCourse);
      fetchInitialRating(findCourse.courseRatings);
    }
  }, [enrolledCourses, courseId]);

  useEffect(() => {
    fetchCourseProgress();
  }, [])

  const toggleDropdown = (chapterId) => {
    setOpenedContents((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const handleWatchClick = (lecture, chapterCount, lectureNo) => {
    setCurrentPlayingLectureId(lecture.lectureId)
    setIsCompleted((courseProgressData?.lectureCompleted || []).includes(lecture.lectureId));
    setPlayerData({
      videoId: lecture.lectureUrl.split('/').pop(),
      lectureTitle: lecture.lectureTitle,
      chapter: chapterCount + 1,
      lecture: lectureNo + 1,
    })
  }

  const handleRatingClick = async (count) => {
    try {
      setRatingOngoing(true)
      const res = await axiosInstance.post("/user/add-rating", { courseId, rating: count })
      if (res?.data?.success) {
        toast.success("Thanks for rating.")
      } else {
        toast.error(res.data?.message)
      }
    } catch (error) {
      console.log('Error in Submiting Your Rating');
      toast.error(error?.response?.data?.message || "Unable to rate")
    } finally {
      setRatingOngoing(false)
    }
  }

  const fetchCourseProgress = async () => {
    try {
      const res = await axiosInstance.post("/user/get-course-progress", { courseId })
      setCourseProgressData(res.data?.progressData)
    } catch (error) {
      console.log('Error in fetch Course Progress');
      toast.error(error?.response?.data?.message || "Unable to fetch Course Progress data")
    }
  }

  const markAsCompleted = async () => {
    const isAlreadyCompleted = (courseProgressData?.lectureCompleted || []).includes(currentPlayingLectureId);

    if (isAlreadyCompleted) {
      setShowConfirmModal(true); // 🧠 Show modal instead of double marking
      return;
    }
    try {
      setMarkCompletedLoader(true);
      // Optimistic UI update
      setCourseProgressData((prev) => ({
        ...prev,
        lectureCompleted: [...(prev?.lectureCompleted || []), currentPlayingLectureId]
      }));
      setIsCompleted(true);

      const res = await axiosInstance.post("/user/mark-course-progress", {
        courseId,
        lectureId: currentPlayingLectureId
      });

      if (res?.data?.success) {
        toast.success("Marked as Completed.");
      } else {
        toast.error(res.data?.message || "Couldn't mark as completed");
      }
    } catch (error) {
      console.log('Error in marking as completed');
      toast.error(error?.response?.data?.message || "Unable to mark completed");
    } finally {
      setMarkCompletedLoader(false);
    }
  };

  const handleUnmarkCompleted = async () => {
    setShowConfirmModal(false);
    try {
      setMarkCompletedLoader(true);

      // Optimistically update progress data
      const updatedList = (courseProgressData?.lectureCompleted || []).filter(id => id !== currentPlayingLectureId);

      setCourseProgressData((prev) => ({
        ...prev,
        lectureCompleted: updatedList
      }));
      setIsCompleted(false);

      const res = await axiosInstance.post("/user/unmark-course-progress", {
        courseId,
        lectureId: currentPlayingLectureId
      });

      if (res?.data?.success) {
        toast.success("Marked as not completed.");
      } else {
        toast.error(res.data?.message || "Couldn't unmark as completed");
      }
    } catch (error) {
      console.log('Error in unmarking as completed');
      toast.error(error?.response?.data?.message || "Unable to unmark completed");
    } finally {
      setMarkCompletedLoader(false);
    }
  };


  const fetchInitialRating = (ratingsArray) => {
    let userRating;
    if (userData?._id) {
      userRating = ratingsArray.find(item => item.userId === userData._id)
    }
    if (userRating) {
      setInitialRating(userRating.rating)
      return;
    } else if (ratingsArray?.length) {
      const { starsCount } = getRatingDetails(ratingsArray);
      setInitialRating(starsCount);
      return;
    }
  }

  const handleIconClick = (e, lectureId) => {
    e.stopPropagation(); // Prevent bubbling to the watch click
    const isAlreadyCompleted = (courseProgressData?.lectureCompleted || []).includes(lectureId);

    if (isAlreadyCompleted) {
      setCurrentPlayingLectureId(lectureId); // ⚠️ Set current for accurate unmarking
      setShowConfirmModal(true);
    }
  };

  const playbackDetails = courseData ? calculatePlaybackDetails(courseData) : null;

  if (!courseData) {
    return (<>
      <div className='px-4 sm:px-8 md:px-36 pt-10 h-80'>
        <div className='w-full mx-auto my-10 flex items-center justify-center '>
          <Spinner classNames="scale-150" />
        </div>
      </div >
    </>)
  }

  return (
    <>
      <div className="p-4 sm:p-8 md:px-20 flex flex-col-reverse md:grid md:grid-cols-2 gap-6 max-w-screen-xl mx-auto">
        {/* left column */}
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
                          chapter.chapterContent.map((lecture, lectureNo) => {
                            return (
                              <li key={`${lecture?.lectureId}-${lectureNo}`} className="flex items-start gap-2 py-1">
                                <img
                                  src={(courseProgressData?.lectureCompleted || []).includes(lecture?.lectureId) ? assets.blueTickIcon : assets.playIcon}
                                  alt="bullet icon"
                                  className="w-4 h-4 mt-1 cursor-pointer"
                                  onClick={(e) => handleIconClick(e, lecture?.lectureId)}
                                />


                                <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                                  <p>{lecture.lectureTitle}</p>
                                  <div onClick={() => handleWatchClick(lecture, chapterCount, lectureNo)} className="flex gap-2">
                                    {lecture.lectureUrl && <p className="text-blue-500 cursor-pointer">Watch</p>}
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
            {/* Rating div */}
            <div className='flex items-center max-sm:flex-col gap-2 py-3 mt-10'>
              <h1 className='text-xl font-bold my-4'>Rate this course :</h1>
              <Rating initialRating={initialRating} onRate={handleRatingClick} isProcessingRating={ratingOngoing} />
            </div>
          </div>
        </div>
        {/* right column */}
        <div className="z-10 rounded-t-2xl md:rounded-lg overflow-hidden w-full sm:min-w-96 bg-white  flex flex-col">
          {/* Video Player or Thumbnail */}
          {
            playerData ? (
              <div className="relative w-full aspect-video">
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
                  iframeClassName="w-full aspect-video"
                  onReady={() => setIsPlayerLoading(false)}
                  onError={() => {
                    toast.error("Failed to load video. Try again later.");
                  }}
                />
              </div>
            ) : (
              <img className="aspect-video object-cover w-full" src={courseData.courseThumbnail} alt="thumbnail" />
            )
          }

          {/* Video Details */}
          <div className="flex flex-wrap justify-between items-center gap-2 px-4 py-3 border-t border-gray-200 text-sm sm:text-base">
            {
              playerData && (
                <p className="text-gray-700 font-medium">
                  Chapter {playerData.chapter} · Lecture {playerData.lecture} - {playerData.lectureTitle}
                </p>
              )
            }{
              currentPlayingLectureId &&
              <button
                onClick={markAsCompleted}
                className="text-blue-600 font-semibold flex items-center justify-center hover:underline transition duration-200">
                {markCompletedLoader ? <Spinner /> : isCompleted || (courseProgressData?.lectureCompleted || []).includes(currentPlayingLectureId)
                  ? "Completed" : "Mark as Completed"}
              </button>
            }

          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleUnmarkCompleted}
        title="Mark as Not Completed?"
        message="Are you sure you want to unmark this lecture as completed? This will update your course progress."
      />
      <Footer />
    </>
  );
};

export default Player;
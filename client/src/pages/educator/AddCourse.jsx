import React, { useEffect, useRef, useState } from 'react';
import uniqid from "uniqid";
import Quill from 'quill';
import assets from '../../assets/assets';

const AddCourse = () => {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const [courseTitle, setCourseTitle] = useState('');
    const [coursePrice, setCoursePrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [image, setImage] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentChapterId, setCurrentChapterId] = useState(null);
    const [lectureDetails, setLectureDetails] = useState({
        lectureTitle: '',
        lectureDuration: "",
        lectureUrl: "",
        isPreviewFree: false
    });

    const handleChapter = (action, chapterId) => {
        if (action === 'add') {
            const title = prompt('Enter Chapter Name:');
            if (title) {
                const newChapter = {
                    chapterId: uniqid(),
                    chapterTitle: title,
                    chapterContent: [],
                    collapsed: false,
                    chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
                };
                setChapters([...chapters, newChapter]);
            }
        } else if (action === 'remove') {
            setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
        } else if (action === 'toggle') {
            setChapters(
                chapters.map((chapter) =>
                    chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
                )
            );
        }
    };

    const handleLecture = (action, chapterId, lectureIndex) => {
        if (action === 'add') {
            setCurrentChapterId(chapterId);
            setShowPopup(true);
        } else if (action === 'remove') {
            setChapters(
                chapters.map((chapter) => {
                    if (chapter.chapterId === chapterId) {
                        const updatedContent = [...chapter.chapterContent];
                        updatedContent.splice(lectureIndex, 1);
                        return { ...chapter, chapterContent: updatedContent };
                    }
                    return chapter;
                })
            );
        }
    };

    const addLecture = () => {
        if (!lectureDetails.lectureTitle || !lectureDetails.lectureDuration || !lectureDetails.lectureUrl) {
            alert('Please fill all lecture details');
            return;
        }

        setChapters(
            chapters.map((chapter) => {
                if (chapter.chapterId === currentChapterId) {
                    const newLecture = {
                        ...lectureDetails,
                        lectureOrder: chapter.chapterContent.length > 0 ?
                            chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
                        lectureId: uniqid(),
                    };
                    return {
                        ...chapter,
                        chapterContent: [...chapter.chapterContent, newLecture]
                    };
                }
                return chapter;
            })
        );
        setShowPopup(false);
        setLectureDetails({
            lectureTitle: '',
            lectureDuration: '',
            lectureUrl: '',
            isPreviewFree: false,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Your submission logic here
    };

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                placeholder: 'Write course description here...',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ script: 'sub' }, { script: 'super' }],
                        [{ indent: '-1' }, { indent: '+1' }],
                        [{ direction: 'rtl' }],
                        [{ size: ['small', false, 'large', 'huge'] }],
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ align: [] }],
                    ],
                },
            });
        }
    }, []);

    return (
        <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
            <form onSubmit={handleSubmit} className='max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6'>
                <h1 className='text-2xl font-bold text-gray-800 mb-6'>Create New Course</h1>

                {/* Course Basic Information */}
                <section className='mb-8'>
                    <h2 className='text-xl font-semibold text-gray-700 mb-4'>Basic Information</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='courseTitle' className='text-sm font-medium text-gray-700'>
                                Course Title
                            </label>
                            <input
                                id='courseTitle'
                                onChange={(e) => setCourseTitle(e.target.value)}
                                value={courseTitle}
                                type="text"
                                placeholder='Enter course title'
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor='coursePrice' className='text-sm font-medium text-gray-700'>
                                Course Price ($)
                            </label>
                            <input
                                id='coursePrice'
                                onChange={(e) => setCoursePrice(e.target.value)}
                                value={coursePrice}
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder='0.00'
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor='discount' className='text-sm font-medium text-gray-700'>
                                Discount (%)
                            </label>
                            <input
                                id='discount'
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
                                type="number"
                                min="0"
                                max="100"
                                placeholder='0'
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-medium text-gray-700'>
                                Course Thumbnail
                            </label>
                            <div className='flex items-center gap-4'>
                                <label htmlFor='thumbnailImage' className='cursor-pointer'>
                                    <div className='p-3 bg-blue-500 rounded-md hover:bg-blue-600 transition'>
                                        <img src={assets.fileUploadIcon} alt="Upload" className='w-5 h-5' />
                                    </div>
                                    <input
                                        type="file"
                                        id="thumbnailImage"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        accept="image/*"
                                        className='hidden'
                                    />
                                </label>
                                {image && (
                                    <img
                                        className='h-12 w-16 object-cover rounded-md border'
                                        src={URL.createObjectURL(image)}
                                        alt="Course thumbnail preview"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='mt-6'>
                        <label htmlFor='courseDescription' className='block text-sm font-medium text-gray-700 mb-2'>
                            Course Description
                        </label>
                        <div
                            ref={editorRef}
                            className='min-h-[200px] border border-gray-300 rounded-md p-4'
                        ></div>
                    </div>
                </section>

                {/* Course Content */}
                <section className='mb-8'>
                    <h2 className='text-xl font-semibold text-gray-700 mb-4'>Course Content</h2>

                    {chapters.length === 0 && (
                        <div className='text-center py-8 text-gray-500'>
                            No chapters added yet. Click below to add your first chapter.
                        </div>
                    )}

                    {chapters?.map((chapter, chapterIndex) => (
                        <div key={chapter.chapterId} className='mb-6 border rounded-lg overflow-hidden'>
                            <div className='flex justify-between items-center p-4 bg-gray-50 border-b'>
                                <div className='flex items-center'>
                                    <button
                                        onClick={() => handleChapter("toggle", chapter.chapterId)}
                                        className='mr-3 focus:outline-none'
                                        aria-label={chapter.collapsed ? 'Expand chapter' : 'Collapse chapter'}
                                    >
                                        <img
                                            src={assets.dropdownIcon}
                                            width={14}
                                            alt=""
                                            className={`transition-transform ${chapter.collapsed ? '-rotate-90' : ''}`}
                                        />
                                    </button>
                                    <span className="font-semibold text-gray-800">
                                        {chapterIndex + 1}. {chapter.chapterTitle}
                                    </span>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <span className='text-sm text-gray-500'>
                                        {chapter.chapterContent.length} lecture{chapter.chapterContent.length !== 1 ? 's' : ''}
                                    </span>
                                    <button
                                        onClick={() => handleChapter('remove', chapter.chapterId)}
                                        className='text-gray-500 hover:text-red-500 focus:outline-none'
                                        aria-label='Remove chapter'
                                    >
                                        <img src={assets.crossIcon} alt="Remove" className='w-4 h-4' />
                                    </button>
                                </div>
                            </div>

                            {!chapter.collapsed && (
                                <div className='p-4'>
                                    {chapter.chapterContent.map((lecture, lectureIndex) => (
                                        <div key={lecture.lectureId} className='flex justify-between items-center mb-3 p-2 hover:bg-gray-50 rounded'>
                                            <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4'>
                                                <span className='text-sm font-medium'>
                                                    {lectureIndex + 1}. {lecture.lectureTitle}
                                                </span>
                                                <span className='text-xs text-gray-500'>
                                                    {lecture.lectureDuration} min
                                                </span>
                                                <a
                                                    href={lecture.lectureUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-blue-500 hover:underline"
                                                >
                                                    Lecture Link
                                                </a>
                                                {lecture.isPreviewFree && (
                                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                                        Free Preview
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleLecture("remove", chapter.chapterId, lectureIndex)}
                                                className='text-gray-400 hover:text-red-500 focus:outline-none'
                                                aria-label='Remove lecture'
                                            >
                                                <img src={assets.crossIcon} alt="Remove" className='w-3 h-3' />
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => handleLecture("add", chapter.chapterId)}
                                        className='flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700 mt-2'
                                    >
                                        <span>+</span> Add Lecture
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => handleChapter('add')}
                        className='flex items-center justify-center gap-2 w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition'
                    >
                        <span>+</span> Add Chapter
                    </button>
                </section>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Create Course
                </button>
            </form>

            {/* Add Lecture Popup */}
            {showPopup && (
                <div className='fixed inset-0 bg-black/50  flex items-center justify-center p-4 z-50'>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Close popup"
                        >
                            <img src={assets.crossIcon} className="w-4 h-4" alt="Close" />
                        </button>

                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Lecture</h2>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor='lectureTitle' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Lecture Title
                                </label>
                                <input
                                    id='lectureTitle'
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={lectureDetails.lectureTitle}
                                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor='lectureDuration' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Duration (minutes)
                                </label>
                                <input
                                    id='lectureDuration'
                                    type="number"
                                    min="1"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={lectureDetails.lectureDuration}
                                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor='lectureUrl' className='block text-sm font-medium text-gray-700 mb-1'>
                                    Lecture URL
                                </label>
                                <input
                                    id='lectureUrl'
                                    type="url"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={lectureDetails.lectureUrl}
                                    onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    id='isPreviewFree'
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    checked={lectureDetails.isPreviewFree}
                                    onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
                                />
                                <label htmlFor='isPreviewFree' className="ml-2 block text-sm text-gray-700">
                                    Free Preview
                                </label>
                            </div>
                        </div>

                        <button
                            onClick={addLecture}
                            type="button"
                            className="w-full mt-6 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Add Lecture
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddCourse;
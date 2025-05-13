import React from 'react';

const SkeletonBox = ({ className }) => (
    <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const CourseDetailsSkeleton = () => {
    return (
        <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-20 pt-10 z-2">
            <div className="absolute top-0 left-0 w-full h-2/4 bg-gradient-to-b from-cyan-100/70 z-0 "></div>

            {/* Left Content */}
            <div className="max-w-xl z-10 w-full">
                <SkeletonBox className="h-8 md:h-10 w-3/4 mb-4" />
                <SkeletonBox className="h-4 w-full mb-2" />
                <SkeletonBox className="h-4 w-5/6 mb-4" />

                <SkeletonBox className="h-5 w-32 mb-6" />

                <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="border border-gray-300 rounded bg-white p-4">
                            <SkeletonBox className="h-4 w-2/3 mb-3" />
                            <SkeletonBox className="h-3 w-full mb-2" />
                            <SkeletonBox className="h-3 w-11/12" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="z-10 sm:min-w-96 w-full md:w-auto bg-white shadow-gray-300/70 shadow-lg rounded-t-2xl md:rounded-none overflow-hidden">
                <SkeletonBox className="h-48 w-full" />
                <div className="p-5 space-y-4">
                    <SkeletonBox className="h-4 w-2/3" />
                    <SkeletonBox className="h-6 w-1/2" />
                    <SkeletonBox className="h-4 w-full" />
                    <SkeletonBox className="h-10 w-full rounded bg-blue-300" />
                    <div className="space-y-2 pt-4">
                        <SkeletonBox className="h-4 w-1/2" />
                        {[1, 2, 3].map((_, i) => (
                            <SkeletonBox key={i} className="h-3 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsSkeleton;

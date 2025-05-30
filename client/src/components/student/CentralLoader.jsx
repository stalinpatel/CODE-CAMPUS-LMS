
const CentralLoader = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
            <div className="flex flex-col items-center justify-center space-y-4 p-4">
                {/* Spinner with responsive sizing */}
                <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 border-t-2 border-b-2 border-blue-500"></div>

                {/* Text with responsive sizing and max-width */}
                <p className="text-sm sm:text-base md:text-lg text-center text-gray-600 max-w-xs sm:max-w-md md:max-w-lg px-4">
                    Loading your personalized dashboard...
                </p>

                {/* Optional: Progress bar or additional loading indicator */}
                <div className="w-full max-w-xs sm:max-w-md bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-blue-500 h-1.5 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
            </div>
        </div>
    );
};

export default CentralLoader;
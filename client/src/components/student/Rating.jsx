import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';

const Rating = ({ initialRating, onRate, isProcessingRating }) => {
    const [count, setCount] = useState(initialRating || 0);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        setCount(initialRating || 0);
        setIsChanged(false); // Reset when prop changes
    }, [initialRating]);

    const handleClick = (rating) => {
        setCount(rating);
        setIsChanged(rating !== initialRating);
    };

    const handleSubmit = () => {
        onRate(count);
        setIsChanged(false);
    };

    return (
        <div className="flex items-center gap-3 flex-wrap">
            {/* Star Rating */}
            <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                    <span
                        key={i}
                        onClick={() => !isProcessingRating && handleClick(i + 1)}
                        className={`cursor-pointer text-2xl transition-colors ${i < count ? 'text-orange-400' : 'text-gray-300'
                            } ${isProcessingRating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        ★
                    </span>
                ))}
            </div>

            {/* Submit Button */}
            {(isChanged || isProcessingRating) && (
                <button
                    disabled={isProcessingRating}
                    onClick={handleSubmit}
                    className="px-4 py-1.5 text-sm font-medium text-white flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition rounded-md shadow-sm w-32"
                >
                    {isProcessingRating ? <Spinner /> : "Submit"}
                </button>
            )}
        </div>
    );
};

export default Rating;

import React, { useEffect, useState } from 'react';

const Rating = ({ initialRating, onRate }) => {
    const [count, setCount] = useState(initialRating || 0);
    useEffect(() => {
        if (initialRating) {
            setCount(initialRating)
        }
    }, [initialRating])
    return (
        <div className=' flex items-center space-x-1'>
            {
                Array.from({ length: 5 }, (_, i) => (
                    <span
                        key={i}
                        onClick={() => setCount(i + 1)}
                        className={`${i < count ? "text-orange-400" : "text-gray-300"} cursor-pointer text-2xl transition-colors`}>
                        ★
                    </span>
                ))
            }
        </div>
    );
};

export default Rating;
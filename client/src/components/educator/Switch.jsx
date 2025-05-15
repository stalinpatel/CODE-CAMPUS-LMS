import React from "react";

export default function Switch({ checked, onChange }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ${checked ? "bg-blue-600" : "bg-gray-300"
                }`}
        >
            <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${checked ? "translate-x-4" : "translate-x-0"
                    }`}
            />
        </button>
    );
}

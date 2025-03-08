'use client';

import React, { useState, useEffect } from 'react';

const DualRangeSlider = ({
    min,
    max,
    value = [min, max],
    onChange,
    step = 1,
    className = ""
}) => {
    const [localValues, setLocalValues] = useState(value);

    useEffect(() => {
        setLocalValues(value);
    }, [value]);

    const handleChange = (e, index) => {
        const newValue = Number(e.target.value);
        const newValues = [...localValues];
        newValues[index] = newValue;

        if (index === 0 && newValue > newValues[1]) {
            newValues[0] = newValues[1];
        }
        else if (index === 1 && newValue < newValues[0]) {
            newValues[1] = newValues[0];
        }

        setLocalValues(newValues);
        onChange && onChange(newValues);
    };

    const getPercent = (value) => {
        return ((value - min) / (max - min)) * 100;
    };

    return (
        <div className={`relative ${className}`}>
            <div className="flex justify-between mb-6">
                <span className="font-medium">${localValues[0]}</span>
                <span className="font-medium">${localValues[1]}</span>
            </div>

            <div className="relative w-full h-2 mb-6">
                <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>
                <div
                    className="absolute h-2 bg-primaryGreen rounded-full"
                    style={{
                        left: `${getPercent(localValues[0])}%`,
                        width: `${getPercent(localValues[1]) - getPercent(localValues[0])}%`
                    }}
                ></div>

                <div className="relative">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={localValues[0]}
                        onChange={(e) => handleChange(e, 0)}
                        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none z-10 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primaryGreen [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primaryGreen [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:cursor-pointer"
                    />

                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={localValues[1]}
                        onChange={(e) => handleChange(e, 1)}
                        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none z-10 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primaryGreen [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primaryGreen [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default DualRangeSlider;
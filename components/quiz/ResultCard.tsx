"use client";

import { useEffect, useState } from "react";

interface ResultCardProps {
    score: number;
    onRetry: () => void;
}

export default function ResultCard({ score, onRetry }: ResultCardProps) {
    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const intervalTime = duration / steps;

        let current = 0;
        const timer = setInterval(() => {
            current += score / steps;
            if (current >= score) {
                setAnimatedScore(score);
                clearInterval(timer);
            } else {
                setAnimatedScore(Math.round(current));
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [score]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 relative z-10">
            {/* Pill Header */}
            <div className="bg-white rounded-[8px] py-2 px-6 mb-8 ">
                <p className="font-manrope font-medium text-[20px] text-[#15313D]">
                    Keep Learning!
                </p>
            </div>

            {/* Main Heading */}
            <h2
                className="text-4xl md:text-[60px] font-dm-serif font-normal italic text-center mb-4 leading-tight"
                style={{
                    background: "linear-gradient(90deg, #15313D 0%, #3CABDA 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "-2px"
                }}
            >
                Your Final score is
            </h2>

            {/* Animated Score */}
            <div className="relative mb-12 flex items-center justify-center">
                <span
                    className="font-dm-serif text-[120px] md:text-[150px] leading-none text-[#1b4b66]"
                >
                    {animatedScore}
                </span>
                <span
                    className="font-dm-serif text-[60px] md:text-[80px] ml-2 italic"
                    style={{
                        background: "linear-gradient(90deg, #15313D 0%, #3CABDA 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                    }}
                >
                    %
                </span>
            </div>

            {/* Start Again Button */}
            <button
                onClick={onRetry}
                className="px-12 py-4 rounded-[10px] transition-all hover:opacity-90"
                style={{
                    border: "1px solid rgba(150, 229, 255, 0.05)",
                    background: "linear-gradient(90deg, #C6E9F7 0.09%, #E5F8FF 99.91%)",
                }}
            >
                <span className="font-manrope font-bold text-[18px] text-[#15313D]">
                    Start Again
                </span>
            </button>

            {/* Removed the borders and simplified container as requested */}
        </div>
    );
}

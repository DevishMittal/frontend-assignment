"use client";

import ResultCard from "@/components/quiz/ResultCard";
import { useState } from "react";
import { QUIZ_QUESTIONS } from "@/lib/quiz-data";
import { motion, AnimatePresence } from "framer-motion";


interface QuizContainerProps {
    isFinished: boolean;
    onFinishChange: (finished: boolean) => void;
}

export default function QuizContainer({ isFinished, onFinishChange }: QuizContainerProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    // const [isFinished, setIsFinished] = useState(false); // Using prop now
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);
    const [direction, setDirection] = useState(0);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    const handleOptionSelect = (option: string) => {
        setAnswers((prev) => ({ ...prev, [QUIZ_QUESTIONS[currentStep].id]: option }));
    };

    const handleNext = () => {
        if (currentStep < QUIZ_QUESTIONS.length - 1) {
            setDirection(1);
            setCurrentStep((prev) => prev + 1);
        } else {
            onFinishChange(true);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep((prev) => prev - 1);
        }
    };

    const calculateScore = () => {
        let score = 0;
        QUIZ_QUESTIONS.forEach((q) => {
            if (answers[q.id] === q.correctAnswer) {
                score++;
            }
        });
        return Math.round((score / QUIZ_QUESTIONS.length) * 100);
    };

    if (isFinished) {
        return (
            <ResultCard
                score={calculateScore()}
                onRetry={() => {
                    onFinishChange(false);
                    setCurrentStep(0);
                    setAnswers({});
                }}
            />
        );
    }

    const currentQuestion = QUIZ_QUESTIONS[currentStep];

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 relative z-10">
            {/* Header */}
            <h1
                className="text-4xl md:text-7xl font-dm-serif mb-6 font-normal italic tracking-tighter text-center pb-2 pr-1"
                style={{
                    background: "linear-gradient(90deg, #15313D 0%, #3CABDA 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}
            >
                Test Your Knowledge
            </h1>

            <div className="bg-white rounded-[8px] py-2 px-6 mb-12">
                <p
                    className="font-manrope font-medium text-[20px] text-[#15313D]"
                >
                    Answer all questions to see your results
                </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full flex gap-4 mb-12 max-w-2xl px-4 md:px-0">
                {QUIZ_QUESTIONS.map((_, idx) => (
                    <div
                        key={idx}
                        className="flex-1 h-2 rounded-full bg-[#E3E3E3] relative overflow-hidden"
                    >
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: idx <= currentStep ? "100%" : "0%" }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute top-0 left-0 h-full w-full rounded-full bg-[#15313D]"
                        />
                    </div>
                ))}
            </div>

            {/* Question Card */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    className="w-full max-w-2xl"
                >
                    <div
                        className="rounded-[10px] p-6 mb-5 text-center border relative"
                        style={{
                            background: "linear-gradient(90deg, #C6E9F7 0%, #E5F8FF 100%)",
                            borderColor: "#96E5FF"
                        }}
                    >
                        <h2 className="text-xl md:text-xl font-manrope font-semibold text-[#15313D] leading-tight">
                            {currentQuestion.id}. {currentQuestion.text}
                        </h2>
                    </div>

                    <div className="flex flex-col gap-[14px] w-full max-w-2xl">
                        {currentQuestion.options.map((option) => {
                            const isSelected = answers[currentQuestion.id] === option;
                            const isHovered = hoveredOption === option;

                            let backgroundStyle = "linear-gradient(90deg, rgba(198, 233, 247, 0.10) 0.09%, rgba(229, 248, 255, 0.10) 99.91%)";
                            if (isSelected) {
                                backgroundStyle = "linear-gradient(90deg, #C6E9F7 0%, #E5F8FF 100%)";
                            } else if (isHovered) {
                                backgroundStyle = "linear-gradient(90deg, rgba(198, 233, 247, 0.60) 0.09%, rgba(229, 248, 255, 0.60) 99.91%)";
                            }

                            return (
                                <button
                                    key={option}
                                    onClick={() => handleOptionSelect(option)}
                                    onMouseEnter={() => setHoveredOption(option)}
                                    onMouseLeave={() => setHoveredOption(null)}
                                    className="w-full p-6 text-center transition-all duration-300 relative group rounded-[10px] border"
                                    style={{
                                        borderColor: isSelected ? "#96E5FF" : "rgba(150, 229, 255, 0.50)",
                                        background: backgroundStyle,
                                        boxShadow: "none"
                                    }}
                                >
                                    <span className="text-[18px] font-manrope font-semibold text-[#15313D]">
                                        {option}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-end w-full max-w-2xl mt-8 gap-2">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="flex items-center justify-center rounded-[10px] transition-all"
                    style={{
                        width: '53px',
                        height: '50px',
                        border: '1px solid rgba(150, 229, 255, 0.05)',
                        background: 'linear-gradient(90deg, #C6E9F7 0.09%, #E5F8FF 99.91%)',
                        opacity: currentStep === 0 ? 0.3 : 1
                    }}
                >
                    <img src="/navigation/bwd.svg" alt="Previous" className="w-6 h-6" />
                </button>
                <button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className="flex items-center justify-center rounded-[10px] transition-all disabled:opacity-50"
                    style={{
                        width: '53px',
                        height: '50px',
                        border: '1px solid rgba(150, 229, 255, 0.05)',
                        background: 'linear-gradient(90deg, #C6E9F7 0.09%, #E5F8FF 99.91%)',
                    }}
                >
                    <img src="/navigation/fwd.svg" alt="Next" className="w-6 h-6" />
                </button>
            </div>

            {/* Cat GIF */}
            <div className="absolute bottom-0 left-8">
                <img
                    src="/bol.svg"
                    alt="Best of Luck"
                    className="absolute bottom-[90%] -left-18 w-24 md:w-32  pointer-events-none "
                />
                <img
                    src="/cat.gif"
                    alt="Cute Cat"
                    className="w-24 md:w-32 opacity-90 pointer-events-none"
                />
            </div>
        </div>
    );
}

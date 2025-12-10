"use client";

import { useState } from "react";
import { QUIZ_QUESTIONS } from "@/lib/quiz-data";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizContainer() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isFinished, setIsFinished] = useState(false);

    const handleOptionSelect = (option: string) => {
        setAnswers((prev) => ({ ...prev, [QUIZ_QUESTIONS[currentStep].id]: option }));
    };

    const handleNext = () => {
        if (currentStep < QUIZ_QUESTIONS.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
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
            <div className="w-full max-w-3xl rounded-3xl bg-white p-12 text-center shadow-xl">
                <h2 className="text-4xl font-bold font-serif text-[#1e3a8a]">Your Final score is</h2>
                <div className="text-6xl font-bold text-[#1e3a8a] my-8">{calculateScore()}%</div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200"
                >
                    Start Again
                </button>
            </div>
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
            <div className="w-full flex gap-4 mb-12 max-w-xl px-4 md:px-0">
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
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
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

                <div className="flex flex-col gap-3">
                    {currentQuestion.options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleOptionSelect(option)}
                            className={`w-full p-4 rounded-lg border-2 text-center transition-all ${answers[currentQuestion.id] === option
                                ? 'border-blue-400 bg-blue-50 text-blue-900 font-medium'
                                : 'border-transparent bg-gray-50 hover:bg-gray-100 text-gray-700'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-end w-full max-w-2xl mt-8 gap-2">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-900 disabled:opacity-50 hover:bg-blue-200"
                >
                    ←
                </button>
                <button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-900 disabled:opacity-50 hover:bg-blue-200"
                >
                    →
                </button>
            </div>
        </div>
    );
}

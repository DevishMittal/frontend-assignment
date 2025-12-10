"use client";

import QuizContainer from "@/components/quiz/QuizContainer";
import { useState } from "react";

export default function Home() {
  const [isFinished, setIsFinished] = useState(false);

  return (
    <main
      className="flex min-h-screen items-center justify-center p-4 md:py-[80px] md:px-[148px]"
      style={{
        background: isFinished
          ? "#F4FDFF"
          : "linear-gradient(107.96deg, #BECFEE 0%, #71C6E2 50%, #D9F4FA 75%, #BECFEE 100%)"
      }}
    >
      <div
        className={`w-full h-full rounded-[50px] relative flex items-center justify-center overflow-hidden transition-all duration-500 ${!isFinished ? "py-[32px] px-[42px]" : "p-0"}`}
        style={!isFinished ? {
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(100px)",
          border: "1.5px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.3)"
        } : { border: "none", boxShadow: "none", background: "transparent" }}
      >
        <div
          className="w-full h-full rounded-[42px] relative"
          style={{ background: "#F4FDFF" }}
        >
          <QuizContainer isFinished={isFinished} onFinishChange={setIsFinished} />
        </div>
      </div>
    </main>
  );
}

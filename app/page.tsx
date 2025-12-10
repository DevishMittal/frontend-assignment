import QuizContainer from "@/components/quiz/QuizContainer";

export default function Home() {
  return (
    <main
      className="flex min-h-screen items-center justify-center p-4 md:py-[80px] md:px-[148px]"
      style={{
        background: "linear-gradient(107.96deg, #BECFEE 0%, #71C6E2 50%, #D9F4FA 75%, #BECFEE 100%)"
      }}
    >
      <div
        className="w-full h-full rounded-[50px] relative flex items-center justify-center overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(100px)",
          // border: "2px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.1)"
        }}>
        <QuizContainer />
      </div>
    </main>
  );
}

import QuizContainer from "@/components/quiz/QuizContainer";

export default function Home() {
  return (
    <main
      className="flex min-h-screen items-center justify-center p-4 md:p-8"
      style={{
        background: "linear-gradient(107.96deg, #BECFEE 0%, #71C6E2 50%, #D9F4FA 75%, #BECFEE 100%)"
      }}
    >
      <div className="w-full max-w-5xl rounded-[40px] p-2" style={{
        backdropFilter: "blur(200px)",
        boxShadow: "0px 4px 24px -1px rgba(0, 0, 0, 0.2)"
      }}>
        <QuizContainer />
      </div>
    </main>
  );
}

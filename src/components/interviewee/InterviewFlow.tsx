import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import {
  startInterview,
  submitAnswer,
} from "../../features/candidate/candidateSlice";
import { demoQuestions } from "../../data/questions";
import { useEffect, useRef, useState } from "react";

function InterviewFlow() {
  const dispatch = useDispatch();
  const candidate = useSelector((state: RootState) => state.candidate);
  const hasAutoSubmittedRef = useRef(false);

  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  // ⏱️ Difficulty-based timing
  function getTimeForQuestion(index: number): number {
    if (index < 2) return 20;
    if (index < 4) return 60;
    return 120;
  }

  // ⏳ Timer logic
  useEffect(() => {
    if (candidate.status !== "IN_PROGRESS") return;
    hasAutoSubmittedRef.current = false;

    const duration = getTimeForQuestion(candidate.currentQuestionIndex);
    setTimeLeft(duration);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1 && !hasAutoSubmittedRef.current) {
          hasAutoSubmittedRef.current = true; // 🔒 lock it
          clearInterval(interval);
          dispatch(submitAnswer(answer));
          setAnswer("");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [candidate.currentQuestionIndex, candidate.status, dispatch]);

  // 🟢 READY state
  if (candidate.status === "READY") {
    return (
      <button onClick={() => dispatch(startInterview(demoQuestions))}>
        Start Interview
      </button>
    );
  }

  // 🟡 IN_PROGRESS state
  if (candidate.status === "IN_PROGRESS") {
    const question = candidate.questions[candidate.currentQuestionIndex];

    return (
      <div>
        <p>Time left: {timeLeft}s</p>

        <h3>Question {candidate.currentQuestionIndex + 1}</h3>

        <p>{question}</p>

        <textarea
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button
          disabled={answer.trim() === ""}
          onClick={() => {
            dispatch(submitAnswer(answer.trim()));
            setAnswer("");
          }}
        >
          Submit Answer
        </button>
      </div>
    );
  }

  // 🔵 COMPLETED state
  if (candidate.status === "COMPLETED") {
    return <h3>Interview Completed</h3>;
  }

  // ⚪ Fallback
  return <p>Current status: {candidate.status}</p>;
}

export default InterviewFlow;

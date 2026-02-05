import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { startInterview, submitAnswer } from "../../features/candidate/candidateSlice";
import { demoQuestions } from "../../data/questions";
import { useState } from "react";


function InterviewFlow() {
    const dispatch = useDispatch();
    const [answer, setAnswer] = useState("");

  const candidate = useSelector((state: RootState) => state.candidate);
    // Decide
  if (candidate.status === "READY") {
  return (
    <button onClick={() => dispatch(startInterview(demoQuestions))}>
      Start Interview
    </button>
  );
}


  if (candidate.status === "IN_PROGRESS") {
    const question = candidate.questions[candidate.currentQuestionIndex];

return (
  <div>
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

  if (candidate.status === "COMPLETED") {
    return <h3>Interview Completed</h3>;
  }

  // Default
  return (
    <div>
      <p>Current status: {candidate.status}</p>
    </div>
  );
}

export default InterviewFlow;

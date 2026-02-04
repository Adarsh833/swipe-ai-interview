import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { startInterview } from "../../features/candidate/candidateSlice";
import { demoQuestions } from "../../data/questions";

function InterviewFlow() {
    const dispatch = useDispatch();
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
    <textarea />
    <button>Submit Answer</button>
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

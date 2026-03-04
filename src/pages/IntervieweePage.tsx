import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { isValidEmail } from "../utils/validators";
import InterviewFlow from "../components/interviewee/InterviewFlow";
import { useState, useEffect } from "react";
import {
  updateName,
  updateEmail,
  updatePhone,
  setStatus,
  resetInterview,
} from "../features/candidate/candidateSlice";
import { evaluateInterview } from "../services/evaluationService";
import ResumeUploader from "../components/interviewee/ResumeUploader";
import { addToHistory } from "../features/candidate/candidateSlice";

function IntervieweePage() {
  const dispatch = useDispatch();
  const candidateState = useSelector((state: RootState) => state.candidate);

  // 🛡️ Guard during redux-persist hydration
  if (!candidateState || !candidateState.current) {
    return <p>Loading...</p>;
  }

  const candidate = candidateState.current;

  const [showResumeModal, setShowResumeModal] = useState(false);

  const isEmailValid = isValidEmail(candidate.email);

  const isProfileComplete =
    candidate.name.trim() !== "" &&
    candidate.phone.trim() !== "" &&
    isEmailValid &&
    candidate.resumeText.trim() !== "";

  // Detect unfinished interview on mount
  useEffect(() => {
    if (candidate.status === "IN_PROGRESS") {
      setShowResumeModal(true);
    }
  }, []);

  useEffect(() => {
  if (candidate.status !== "COMPLETED") return;

  const result = evaluateInterview(
    candidate.questions,
    candidate.answers
  );

  dispatch(addToHistory(result));

}, [candidate.status, dispatch]);

  // 🔴 DEV Reset Button
  const DevResetButton =
    import.meta.env.DEV ? (
      <button
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "red",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 9999,
        }}
        onClick={() => {
          dispatch(resetInterview());
        }}
      >
        Dev Reset
      </button>
    ) : null;

  // 🟢 COMPLETED STATE
  if (candidate.status === "COMPLETED") {
    return (
      <>
        <div style={{ padding: 20 }}>
          <h2>Interview Completed 🎉</h2>
          <p>Thank you for participating.</p>

          <button
            onClick={() => {
              dispatch(resetInterview());
            }}
            style={{ marginTop: 15 }}
          >
            Return to Home
          </button>
        </div>

        {DevResetButton}
      </>
    );
  }

  // 🟡 Resume Modal
  if (showResumeModal) {
    return (
      <>
        <div style={{ padding: 20, border: "1px solid gray" }}>
          <h3>Welcome Back</h3>
          <p>You have an unfinished interview.</p>

          <button onClick={() => setShowResumeModal(false)}>
            Resume Interview
          </button>

          <button
            onClick={() => {
              dispatch(resetInterview());
              setShowResumeModal(false);
            }}
            style={{ marginLeft: 10 }}
          >
            Restart Interview
          </button>
        </div>

        {DevResetButton}
      </>
    );
  }

  // 🔵 If interview started
  if (candidate.status !== "NEW") {
    return (
      <>
        <InterviewFlow />
        {DevResetButton}
      </>
    );
  }

  // ⚪ Default: Profile Form
  return (
    <>
      <div style={{ padding: 20 }}>
        <h2>Candidate Profile</h2>

        <input
          placeholder="Name"
          value={candidate.name}
          onChange={(e) => dispatch(updateName(e.target.value))}
        />
        <br />

        <input
          placeholder="Email"
          value={candidate.email}
          onChange={(e) => dispatch(updateEmail(e.target.value))}
        />

        {candidate.email !== "" && !isEmailValid && (
          <p style={{ color: "red" }}>Invalid email format</p>
        )}

        <br />

        <input
          placeholder="Phone"
          value={candidate.phone}
          onChange={(e) => dispatch(updatePhone(e.target.value))}
        />
        <br />

        <button
          disabled={!isProfileComplete}
          onClick={() => dispatch(setStatus("READY"))}
        >
          Continue to Interview
        </button>

        {candidate.resumeText === "" && (
          <p style={{ color: "orange" }}>
            Please upload resume to continue
          </p>
        )}

        <p>Status: {candidate.status}</p>

        <ResumeUploader />
      </div>

      {DevResetButton}
    </>
  );
}

export default IntervieweePage;
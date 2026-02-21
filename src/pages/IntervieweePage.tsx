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
import ResumeUploader from "../components/interviewee/ResumeUploader";

function IntervieweePage() {
  const dispatch = useDispatch();
  const candidate = useSelector((state: RootState) => state.candidate);

  const [showResumeModal, setShowResumeModal] = useState(false);

  const isEmailValid = isValidEmail(candidate.email);

  const isProfileComplete =
    candidate.name !== "" &&
    candidate.phone !== "" &&
    isEmailValid &&
    candidate.resumeText !== "";

  // 🔥 Detect unfinished interview on mount
  useEffect(() => {
    if (candidate.status === "IN_PROGRESS") {
      setShowResumeModal(true);
    }
  }, []);

  // 🔴 Global Dev Reset Button (always visible in DEV)
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
          localStorage.removeItem("persist:root");
          dispatch(resetInterview());
          window.location.reload();
        }}
      >
        Dev Reset
      </button>
    ) : null;

  // 1️⃣ Welcome Back Modal (Highest Priority)
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
          >
            Restart Interview
          </button>
        </div>

        {DevResetButton}
      </>
    );
  }

  // 2️⃣ If interview started, show InterviewFlow
  if (candidate.status !== "NEW") {
    return (
      <>
        <InterviewFlow />
        {DevResetButton}
      </>
    );
  }

  // 3️⃣ Default: Profile Form
  return (
    <>
      <div>
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

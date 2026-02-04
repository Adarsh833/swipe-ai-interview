import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { isValidEmail } from "../utils/validators";
import InterviewFlow from "../components/interviewee/InterviewFlow";

import {
  updateName,
  updateEmail,
  updatePhone,
  setStatus,
} from "../features/candidate/candidateSlice";
import ResumeUploader from "../components/interviewee/ResumeUploader";

function IntervieweePage() {
  const dispatch = useDispatch();
  const candidate = useSelector((state: RootState) => state.candidate);

  const isEmailValid = isValidEmail(candidate.email);

  const isProfileComplete =
  candidate.name !== '' &&
  candidate.phone !== '' &&
  isEmailValid &&
  candidate.resumeText !== '';

  if (candidate.status !== "NEW") {
    return <InterviewFlow />;
  }

  return (
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
      {candidate.resumeText === '' && (
  <p style={{ color: 'orange' }}>Please upload resume to continue</p>
)}


      <p>Status: {candidate.status}</p>
      <ResumeUploader />
    </div>
  );
}

export default IntervieweePage;

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import {
  updateName,
  updateEmail,
  updatePhone,
  setStatus,
} from '../features/candidate/candidateSlice';
import ResumeUploader from '../components/interviewee/ResumeUploader';


function IntervieweePage() {
  const dispatch = useDispatch();
  const candidate = useSelector((state: RootState) => state.candidate);

  const isProfileComplete =
    candidate.name !== '' &&
    candidate.email !== '' &&
    candidate.phone !== '';

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
      <br />

      <input
        placeholder="Phone"
        value={candidate.phone}
        onChange={(e) => dispatch(updatePhone(e.target.value))}
      />
      <br />

      <button
        disabled={!isProfileComplete}
        onClick={() => dispatch(setStatus('READY'))}
      >
        Continue to Interview
      </button>

      <p>Status: {candidate.status}</p>
        <ResumeUploader />
    </div>
  );
}

export default IntervieweePage;

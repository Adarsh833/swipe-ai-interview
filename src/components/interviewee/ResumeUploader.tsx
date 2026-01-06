import { useDispatch } from 'react-redux';
import { setResumeText, setStatus } from '../../features/candidate/candidateSlice';
import { extractResumeText } from '../../services/resumeParser';

function ResumeUploader() {
  const dispatch = useDispatch();

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf') && !file.name.endsWith('.docx')) {
      alert('Only PDF or DOCX allowed');
      return;
    }

    const text = await extractResumeText(file);
    dispatch(setResumeText(text));
    dispatch(setStatus('READY'));
  };

  return (
    <div>
      <h3>Upload Resume</h3>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default ResumeUploader;

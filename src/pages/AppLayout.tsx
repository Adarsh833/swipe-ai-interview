import { useState } from 'react';
import IntervieweePage from './IntervieweePage';
import InterviewerPage from './InterviewerPage';

function AppLayout() {
  const [activeTab, setActiveTab] = useState<'interviewee' | 'interviewer'>(
   //by default we can keep this //'interviewee'
  );

  return (
    <div style={{ padding: 20 }}>
      <header style={{ marginBottom: 20 }}>
        <button onClick={() => setActiveTab('interviewee')}>
          Interviewee
        </button>
        <button onClick={() => setActiveTab('interviewer')}>
          Interviewer
        </button>
      </header>

      {activeTab === 'interviewee' && <IntervieweePage />}
      {activeTab === 'interviewer' && <InterviewerPage />}
    </div>
  );
}

export default AppLayout;

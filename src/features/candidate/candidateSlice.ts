import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CandidateState {
  id: string;
  name: string;
  email: string;
  phone: string;
  resumeText: string;

  questions: string[];
  currentQuestionIndex: number;
  answers: string[];

  status: 'NEW' | 'READY' | 'IN_PROGRESS' | 'COMPLETED';
}

const initialState: CandidateState = {
  id: crypto.randomUUID(),
  name: '',
  email: '',
  phone: '',
  resumeText: '',

  questions: [],
  currentQuestionIndex: 0,
  answers: [],

  status: 'NEW',
};

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },

    updateEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },

    updatePhone(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },

    setStatus(state, action: PayloadAction<CandidateState['status']>) {
      state.status = action.payload;
    },

    setResumeText(state, action: PayloadAction<string>) {
      state.resumeText = action.payload;
    },

    startInterview(state, action: PayloadAction<string[]>) {
      state.questions = action.payload;
      state.status = 'IN_PROGRESS';
      state.currentQuestionIndex = 0;
      state.answers = [];
    },

    submitAnswer(state, action: PayloadAction<string>) {
      state.answers.push(action.payload);
      state.currentQuestionIndex += 1;

      if (state.currentQuestionIndex >= state.questions.length) {
        state.status = 'COMPLETED';
      }
    },

    // ✅ CORRECT PLACE
    resetInterview(state) {
      state.id = crypto.randomUUID();
      state.name = '';
      state.email = '';
      state.phone = '';
      state.resumeText = '';
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.answers = [];
      state.status = 'NEW';
    },
  },
});

export const {
  updateName,
  updateEmail,
  updatePhone,
  setStatus,
  setResumeText,
  startInterview,
  submitAnswer,
  resetInterview,
} = candidateSlice.actions;

export default candidateSlice.reducer;

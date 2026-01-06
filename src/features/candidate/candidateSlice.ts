import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CandidateState {
  id: string;
  name: string;
  email: string;
  phone: string;
  resumeText: string;
  status: 'NEW' | 'READY' | 'IN_PROGRESS' | 'COMPLETED';
}

const initialState: CandidateState = {
  id: crypto.randomUUID(),
  name: '',
  email: '',
  phone: '',
  resumeText: '',
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
  },
});

export const {
  updateName,
  updateEmail,
  updatePhone,
  setStatus,
  setResumeText,
} = candidateSlice.actions;

export default candidateSlice.reducer;

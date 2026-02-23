import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/* ---------- Types ---------- */

export interface CurrentCandidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  resumeText: string;

  questions: string[];
  currentQuestionIndex: number;
  answers: string[];

  status: "NEW" | "READY" | "IN_PROGRESS" | "COMPLETED";
}

export interface CompletedCandidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  questions: string[];
  answers: string[];
  score: number;
  summary: string;
}

export interface CandidateState {
  current: CurrentCandidate;
  history: CompletedCandidate[];
}

/* ---------- Initial State ---------- */

const initialCurrent: CurrentCandidate = {
  id: crypto.randomUUID(),
  name: "",
  email: "",
  phone: "",
  resumeText: "",

  questions: [],
  currentQuestionIndex: 0,
  answers: [],

  status: "NEW",
};

const initialState: CandidateState = {
  current: initialCurrent,
  history: [],
};

/* ---------- Slice ---------- */

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    /* Profile updates */
    updateName(state, action: PayloadAction<string>) {
      state.current.name = action.payload;
    },

    updateEmail(state, action: PayloadAction<string>) {
      state.current.email = action.payload;
    },

    updatePhone(state, action: PayloadAction<string>) {
      state.current.phone = action.payload;
    },

    setResumeText(state, action: PayloadAction<string>) {
      state.current.resumeText = action.payload;
    },

    setStatus(
      state,
      action: PayloadAction<CurrentCandidate["status"]>
    ) {
      state.current.status = action.payload;
    },

    /* Interview Start */
    startInterview(state, action: PayloadAction<string[]>) {
      state.current.questions = action.payload;
      state.current.status = "IN_PROGRESS";
      state.current.currentQuestionIndex = 0;
      state.current.answers = [];
    },

    /* Answer Submission */
    submitAnswer(state, action: PayloadAction<string>) {
      state.current.answers.push(action.payload);
      state.current.currentQuestionIndex += 1;

      if (
        state.current.currentQuestionIndex >=
        state.current.questions.length
      ) {
        state.current.status = "COMPLETED";

        /* --------- Generate score --------- */
        const score = Math.floor(
          (state.current.answers.length /
            state.current.questions.length) *
            100
        );

        /* --------- Generate summary --------- */
        const summary =
          score > 70
            ? "Strong performance with good understanding."
            : score > 40
            ? "Average performance with room for improvement."
            : "Needs significant improvement.";

        /* --------- Push to history --------- */
        state.history.push({
          id: state.current.id,
          name: state.current.name,
          email: state.current.email,
          phone: state.current.phone,
          questions: state.current.questions,
          answers: state.current.answers,
          score,
          summary,
        });

        /* --------- Reset current --------- */
        state.current = {
          ...initialCurrent,
          id: crypto.randomUUID(),
        };
      }
    },

    /* Reset Entire Session */
    resetInterview(state) {
      state.current = {
        ...initialCurrent,
        id: crypto.randomUUID(),
      };
    },
  },
});

export const {
  updateName,
  updateEmail,
  updatePhone,
  setResumeText,
  setStatus,
  startInterview,
  submitAnswer,
  resetInterview,
} = candidateSlice.actions;

export default candidateSlice.reducer;
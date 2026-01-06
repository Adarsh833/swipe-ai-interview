import { combineReducers } from '@reduxjs/toolkit';
import candidateReducer from '../features/candidate/candidateSlice';

const rootReducer = combineReducers({
  candidate: candidateReducer,
});

export default rootReducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TJob } from '../../types/jobTypes';

type JobState = {
  jobs: TJob[];
};

const initialState: JobState = {
  jobs: [],
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<TJob[]>) => {
      state.jobs = action.payload;
    },
    clearJobs: state => {
      state.jobs = [];
    },
  },
});

export const { clearJobs, setJobs } = jobSlice.actions;

export default jobSlice.reducer;

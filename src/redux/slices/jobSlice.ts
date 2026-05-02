import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TJob } from '../../types/jobTypes';

type JobState = {
  jobs: TJob[];
  isLoading: boolean;
  error: string | null;
};

const initialState: JobState = {
  jobs: [],
  isLoading: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJobLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setJobError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setJobs: (state, action: PayloadAction<TJob[]>) => {
      state.jobs = action.payload;
    },
    clearJobs: state => {
      state.jobs = [];
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const { clearJobs, setJobError, setJobLoading, setJobs } =
  jobSlice.actions;

export default jobSlice.reducer;

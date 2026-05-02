import { globalErrorHandler } from '../helpers/globalErrorHandler';
import { API_ENDPOINTS } from '../redux/api';
import { setJobError, setJobLoading, setJobs } from '../redux/slices/jobSlice';
import type { AppDispatch } from '../redux/store';
import { instance } from './axios/axiosInstance';
import type { TResponse } from '../types/commonTypes';
import type { TJob } from '../types/jobTypes';

export async function loadJobs(dispatch: AppDispatch) {
  dispatch(setJobLoading(true));
  dispatch(setJobError(null));

  try {
    const response = await instance.get<TResponse<TJob[]>>(API_ENDPOINTS.jobs);
    dispatch(setJobs(response.data.data));
  } catch (error) {
    const { message } = globalErrorHandler(error);
    dispatch(setJobError(message || 'Failed to fetch jobs'));
  } finally {
    dispatch(setJobLoading(false));
  }
}

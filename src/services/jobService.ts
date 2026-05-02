import { globalErrorHandler } from '../helpers/globalErrorHandler';
import { API_ENDPOINTS } from '../redux/api';
import { instance } from './axios/axiosInstance';
import type { TResponse } from '../types/commonTypes';
import type { TJob } from '../types/jobTypes';

export async function getJobs() {
  try {
    const response = await instance.get<TResponse<TJob[]>>(API_ENDPOINTS.jobs);

    return {
      data: response.data.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: globalErrorHandler(error),
    };
  }
}

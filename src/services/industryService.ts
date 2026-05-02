import { globalErrorHandler } from '../helpers/globalErrorHandler';
import { API_ENDPOINTS } from '../redux/api';
import { instance } from './axios/axiosInstance';
import type { TResponse } from '../types/commonTypes';
import { TIndustry } from '../types/industryTypes';

export async function getIndustries() {
  try {
    const response = await instance.get<TResponse<TIndustry[]>>(
      API_ENDPOINTS.industries,
    );

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

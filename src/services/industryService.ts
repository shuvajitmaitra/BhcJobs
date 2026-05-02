import { globalErrorHandler } from '../helpers/globalErrorHandler';
import { API_ENDPOINTS } from '../redux/api';
import {
  setIndustries,
  setIndustryError,
  setIndustryLoading,
} from '../redux/slices/industrySlice';
import type { AppDispatch } from '../redux/store';
import { instance } from './axios/axiosInstance';
import type { TResponse } from '../types/commonTypes';
import { TIndustry } from '../types/industryTypes';

export async function loadIndustries(dispatch: AppDispatch) {
  dispatch(setIndustryLoading(true));
  dispatch(setIndustryError(null));

  try {
    const response = await instance.get<TResponse<TIndustry[]>>(
      API_ENDPOINTS.industries,
    );
    dispatch(setIndustries(response.data.data));
  } catch (error) {
    const { message } = globalErrorHandler(error);
    dispatch(setIndustryError(message || 'Failed to fetch industries'));
  } finally {
    dispatch(setIndustryLoading(false));
  }
}

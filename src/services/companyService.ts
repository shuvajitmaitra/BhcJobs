import { globalErrorHandler } from '../helpers/globalErrorHandler';
import { API_ENDPOINTS } from '../redux/api';
import {
  setCompanies,
  setCompanyError,
  setCompanyLoading,
} from '../redux/slices/companySlice';
import type { AppDispatch } from '../redux/store';
import { instance } from './axios/axiosInstance';
import type { TCompany } from '../types/companyTypes';
import type { TResponse } from '../types/commonTypes';

export async function loadCompanies(dispatch: AppDispatch) {
  dispatch(setCompanyLoading(true));
  dispatch(setCompanyError(null));

  try {
    const response =
      await instance.get<TResponse<TCompany[]>>(API_ENDPOINTS.companies);
    dispatch(setCompanies(response.data.data));
  } catch (error) {
    const { message } = globalErrorHandler(error);
    dispatch(setCompanyError(message || 'Failed to fetch companies'));
  } finally {
    dispatch(setCompanyLoading(false));
  }
}

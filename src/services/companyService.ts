import { globalErrorHandler } from '../helpers/globalErrorHandler';
import { API_ENDPOINTS } from '../redux/api';
import { instance } from './axios/axiosInstance';
import type { TCompany } from '../types/companyTypes';
import type { TResponse } from '../types/commonTypes';

export async function getCompanies() {
  try {
    const response =
      await instance.get<TResponse<TCompany[]>>(API_ENDPOINTS.companies);

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

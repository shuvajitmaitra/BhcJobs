import { globalErrorHandler } from '../helpers/globalErrorHandler';
import { API_ENDPOINTS } from '../redux/api';
import {
  TLogin,
  TUserProfile,
  TUserProfileApiResponse,
} from '../types/authTypes';
import { TResponse } from '../types/commonTypes';
import { instance } from './axios/axiosInstance';

type SignInPayload = {
  phone: string;
  password: string;
};

export async function signInUser(payload: SignInPayload): Promise<{
  data: TLogin | null;
  error: {
    message: string;
    status?: number;
    data?: unknown;
  } | null;
}> {
  try {
    const response = await instance.post<TResponse<TLogin>>(
      API_ENDPOINTS.login,
      payload,
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

export const getUserInfo = async () => {
  try {
    const response = await instance.get<TUserProfileApiResponse>(
      API_ENDPOINTS.getUser,
    );

    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: globalErrorHandler(error),
    };
  }
};

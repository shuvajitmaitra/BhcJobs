import { globalErrorHandler } from '../helpers/globalErrorHandler';
import { API_ENDPOINTS } from '../redux/api';
import {
  TLogin,
  TRegisterPayload,
  TUserProfileApiResponse,
  TVerifyPayload,
} from '../types/authTypes';
import { TResponse } from '../types/commonTypes';
import { instance } from './axios/axiosInstance';

type SignInPayload = {
  phone: string;
  password: string;
};
export const signInUser = async (payload: SignInPayload) => {
  try {
    const response = await instance.post<TResponse<TLogin>>(
      API_ENDPOINTS.login,
      payload,
    );
    return response.data;
  } catch (error) {
    globalErrorHandler(error);
  }
};
export const createUser = async (payload: TRegisterPayload) => {
  try {
    const response = await instance.post(API_ENDPOINTS.register, payload);
    return response.data;
  } catch (error) {
    globalErrorHandler(error);
  }
};
export const verifyPhone = async (payload: TVerifyPayload) => {
  try {
    const response = await instance.post(API_ENDPOINTS.verifyUser, payload);
    return response.data;
  } catch (error) {
    globalErrorHandler(error);
  }
};
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

import { isAxiosError } from 'axios';
import { TErrorResponse } from '../types/commonTypes';

type GlobalErrorResult = {
  message: string;
  status?: number;
  data?: TErrorResponse | unknown;
};

export const globalErrorHandler = (error: unknown): GlobalErrorResult => {
  if (isAxiosError<TErrorResponse>(error)) {
    const errorData = error.response?.data;
    const message =
      errorData?.message || error.message || 'An unknown error occurred';

    console.warn({
      status: error.response?.status,
      message,
      data: errorData,
    });

    return {
      status: error.response?.status,
      message,
      data: errorData,
    };
  }

  const fallbackMessage =
    error instanceof Error ? error.message : 'An unknown error occurred';

  console.warn({ message: fallbackMessage, data: error });

  return {
    message: fallbackMessage,
    data: error,
  };
};

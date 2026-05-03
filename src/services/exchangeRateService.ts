import axios from 'axios';
import { globalErrorHandler } from '../helpers/globalErrorHandler';

type TExchangeRateResponse = {
  base: string;
  quote: string;
  date: string;
  rate: number;
};

export async function getExchangeRate(from: string, to: string) {
  try {
    if (from === to) {
      return {
        data: 1,
        error: null,
      };
    }

    const response = await axios.get<TExchangeRateResponse>(
      `https://api.frankfurter.dev/v2/rate/${from}/${to}`,
      {
        timeout: 15000,
      },
    );

    return {
      data: response.data.rate ?? null,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: globalErrorHandler(error),
    };
  }
}

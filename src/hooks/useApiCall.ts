import { useCallback, useState } from 'react';

type ApiCallResult<T> = {
  data: T | null;
  error: {
    message: string;
    status?: number;
    data?: unknown;
  } | null;
};

export function useApiCall<T>(
  request: () => Promise<ApiCallResult<T>>,
  onSuccess?: (data: T) => void,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await request();

    if (result.data && onSuccess) {
      onSuccess(result.data);
    }

    if (result.error) {
      setError(result.error.message);
    }

    setLoading(false);
    return result;
  }, [onSuccess, request]);

  return {
    error,
    execute,
    loading,
  };
}

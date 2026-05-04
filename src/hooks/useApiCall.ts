import { useCallback, useState } from 'react';

type ApiCallResult<T> = {
  data: T | null;
  error: { message: string } | null;
  status?: boolean;
};

export function useApiCall<T, P = void>(
  request: (params: P) => Promise<ApiCallResult<T>>,
  onSuccess?: (data: T) => void,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (params: P) => {
      setLoading(true);
      setError(null);

      const result = await request(params);

      if (result.data && onSuccess) {
        onSuccess(result.data);
      }

      if (result.error) {
        setError(result.error.message);
      }

      setLoading(false);
      return result;
    },
    [onSuccess, request],
  );

  return { error, execute, loading };
}

export type TResponse<T> = {
  status: boolean;
  message?: string;
  data: T;
  error?: Record<string, string[]>;
};

export type TErrorResponse = {
  message: string;
  exception: string;
  file: string;
  line: number;
  trace: TraceItem[];
  status: false;
};

export type TraceItem = {
  file: string;
  line: number;
  function: string;
  class?: string;
  type?: '->' | '::';
};

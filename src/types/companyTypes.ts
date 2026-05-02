

export type TCompany = {
  id: number;
  name: string;
  image?: string | null;
  jobs_count?: number;
  [key: string]: unknown;
};

export type TJob = {
  id: number;
  title?: string;
  name?: string;
  company_id?: number;
  industry_id?: number;
  image?: string | null;
  [key: string]: unknown;
};

export type TJob = {
  id: number;
  title?: string;
  name?: string;
  job_title?: string;
  slug?: string;
  company_id?: number;
  category_id?: number;
  country_id?: number;
  industry_id?: number;
  city_id?: number | null;
  image?: string | null;
  company_name?: string;
  industry_name?: string;
  status?: string;
  type?: string;
  currency: string;
  salary_type?: string;
  min_salary: number;
  max_salary?: number;
  office_rate?: number | null;
  salary?: string | number;
  salary_bdt?: string | number;
  food_option?: string | number | null;
  food_amount?: string | number | null;
  food_allowance?: string | number;
  food_allowance_bdt?: string | number;
  expiry?: string;
  is_active?: 0 | 1;
  is_trending?: 0 | 1;
  is_hot?: 0 | 1;
  category?: {
    id: number;
    name: string;
  };
  country?: {
    id: number;
    name: string;
  };
  city?: {
    id: number;
    name: string;
  } | null;
  company?: {
    id: number;
    name: string;
    image?: string;
  };
  [key: string]: unknown;
};

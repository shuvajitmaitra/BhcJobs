export type TRegisterPayload = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirm_password: string;
  nid: string;
  dob: Date;
  passport_number: string;
  gender: string;
};
export type TRegisterSuccessResponse = {
  id: number;
  phone: string;
  email: string;
};

export type TVerifyPayload = {
  phone: string;
  otp: string;
};
export type TVerifySuccessResponse = {
  token: string;
  user_id: number;
  phone: string;
  email: string;
  name: string;
};

export type TLogin = {
  token: string;
};

export interface TUserProfileApiResponse {
  data: TUserProfile;
  profile_completion: number;
  total_applications: number;
  hired_count: number;
  interview_count: number;
  shortlisted_count: number;
  selected: boolean;
}

export interface TUserProfile {
  id: number;
  unique_id: string;
  agent_id: number | null;
  created_by: number | null;
  updated_by: number | null;
  name: string;
  otp_resend_count: number | null;
  last_otp_resend: string | null;
  image: string | null;
  email: string;
  phone: string;
  password: string;
  role_id: number | null;
  gender: string | null;
  profile_completion: number | null;
  ip_address: string | null;
  login_at: string | null;
  phone_verified_at: string | null;
  email_verified_at: string | null;
  otp: string | null;
  passport_number: string | null;
  passport_expiry: string | null;
  DOB: string | null;
  otp_expiry: string | null;
  phone_change_count: number | null;
  email_otp: string | null;

  is_verified: number;
  is_featured: number;
  is_active: number;
  status: string | null;
  is_blocked: number;

  blocked_by: number | null;
  blocked_at: string | null;
  blocked_reason: string | null;

  is_shortlisted: number;
  shortlisted_by: number | null;
  shortlisted_at: string | null;
  shortlisted_note: string | null;

  is_sms: number;
  premium_by: number | null;
  verified_by: number | null;

  is_premium: number;
  is_csv: number;
  user_agent: string | null;

  created_at: string;
  updated_at: string;

  j_s_personal_info: TPersonalInfo | null;

  j_s_exprience_info: unknown[];
  j_s_training_info: unknown[];
  js_soft_skills: unknown[];
  js_hard_skills: unknown[];
  js_interest: unknown[];
  js_categories: unknown[];
  j_s_document_info: unknown[];
  j_s_physical_info: unknown[];
  j_s_language_info: unknown[];
}

export interface TPersonalInfo {
  id: number;
  job_seeker_id: number;
  dob: string | null;

  country_id: number | null;
  city_id: number | null;
  upazila_id: number | null;
  category_id: number | null;

  passport_number: string | null;
  passport_expiry: string | null;

  iqama_number: string | null;
  iqama_expiry: string | null;

  skin_color: string | null;
  gender: string | null;
  religion: string | null;
  marital_status: string | null;

  height_feet: number | null;
  height_inch: number | null;
  weight: number | null;

  nid_number: string | null;
  full_address: string | null;

  fathers_name: string | null;
  mothers_name: string | null;

  facebook_link: string | null;
  linkedin_link: string | null;
  twitter_link: string | null;
  instagram_link: string | null;

  is_foreign_return: number | null;
  is_smoking: number | null;
  is_accident: number | null;
  is_disease: number | null;

  emergency_contact: string | null;
  permanent_full_address: string | null;

  is_operation: number | null;
  operation_desc: string | null;

  created_at: string;
  updated_at: string;
}

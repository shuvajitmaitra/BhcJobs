export const API_ENDPOINTS = {
  industries: '/api/industry/get',
  jobs: '/api/job/get',
  companies: '/api/company/get',
  login: '/api/job_seeker/login',
  getUser: '/api/job_seeker/dashboard/get',
  register: '/api/job_seeker/register',
  verifyUser: '/api/job_seeker/phone_verify',
} as const;

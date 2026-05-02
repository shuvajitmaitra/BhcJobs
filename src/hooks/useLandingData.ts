import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setCompanies } from '../redux/slices/companySlice';
import { setIndustries } from '../redux/slices/industrySlice';
import { setJobs } from '../redux/slices/jobSlice';
import { useApiCall } from './useApiCall';
import { getCompanies } from '../services/companyService';
import { getIndustries } from '../services/industryService';
import { getJobs } from '../services/jobService';

export function useLandingData() {
  const dispatch = useAppDispatch();
  const industries = useAppSelector(state => state.industry.industries);
  const companies = useAppSelector(state => state.company.companies);
  const jobs = useAppSelector(state => state.job.jobs);
  const isAuthenticate = useAppSelector(state => state.auth.isAuthenticate);
  const {
    error: industriesError,
    execute: loadIndustriesData,
    loading: industriesLoading,
  } = useApiCall(getIndustries, data => {
    dispatch(setIndustries(data));
  });
  const {
    error: companiesError,
    execute: loadCompaniesData,
    loading: companiesLoading,
  } = useApiCall(getCompanies, data => {
    dispatch(setCompanies(data));
  });
  const {
    error: jobsError,
    execute: loadJobsData,
    loading: jobsLoading,
  } = useApiCall(getJobs, data => {
    dispatch(setJobs(data));
  });

  useEffect(() => {
    loadIndustriesData();
    loadCompaniesData();
    loadJobsData();
  }, []);

  return {
    companies,
    companiesError,
    companiesLoading,
    industries,
    industriesError,
    industriesLoading,
    isAuthenticate,
    jobs,
    jobsError,
    jobsLoading,
    loadCompaniesData,
    loadIndustriesData,
    loadJobsData,
  };
}

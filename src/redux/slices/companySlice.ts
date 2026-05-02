import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TCompany } from '../../types/companyTypes';

type CompanyState = {
  companies: TCompany[];
  isLoading: boolean;
  error: string | null;
};

const initialState: CompanyState = {
  companies: [],
  isLoading: false,
  error: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCompanyError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCompanies: (state, action: PayloadAction<TCompany[]>) => {
      state.companies = action.payload;
    },
    clearCompanies: state => {
      state.companies = [];
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  clearCompanies,
  setCompanies,
  setCompanyError,
  setCompanyLoading,
} = companySlice.actions;

export default companySlice.reducer;

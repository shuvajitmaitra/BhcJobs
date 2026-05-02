import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TCompany } from '../../types/companyTypes';

type CompanyState = {
  companies: TCompany[];
};

const initialState: CompanyState = {
  companies: [],
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<TCompany[]>) => {
      state.companies = action.payload;
    },
    clearCompanies: state => {
      state.companies = [];
    },
  },
});

export const { clearCompanies, setCompanies } = companySlice.actions;

export default companySlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIndustry } from '../../types/industryTypes';

type IndustryState = {
  industries: TIndustry[];
  isLoading: boolean;
  error: string | null;
};

const initialState: IndustryState = {
  industries: [],
  isLoading: false,
  error: null,
};

const industrySlice = createSlice({
  name: 'industry',
  initialState,
  reducers: {
    setIndustryLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIndustryError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setIndustries: (state, action: PayloadAction<TIndustry[]>) => {
      state.industries = action.payload;
    },
    clearIndustries: state => {
      state.industries = [];
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  clearIndustries,
  setIndustries,
  setIndustryError,
  setIndustryLoading,
} = industrySlice.actions;

export default industrySlice.reducer;

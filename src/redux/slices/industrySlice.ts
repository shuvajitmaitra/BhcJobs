import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIndustry } from '../../types/industryTypes';

type IndustryState = {
  industries: TIndustry[];
};

const initialState: IndustryState = {
  industries: [],
};

const industrySlice = createSlice({
  name: 'industry',
  initialState,
  reducers: {
    setIndustries: (state, action: PayloadAction<TIndustry[]>) => {
      state.industries = action.payload;
    },
    clearIndustries: state => {
      state.industries = [];
    },
  },
});

export const { clearIndustries, setIndustries } = industrySlice.actions;

export default industrySlice.reducer;

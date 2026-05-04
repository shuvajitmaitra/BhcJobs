import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserProfileApiResponse } from '../../types/authTypes';

type AuthState = {
  token: string | null;
  user: TUserProfileApiResponse | null;
  isAuthenticate: boolean;
  theme: 'light' | 'dark';
};

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticate: false,
  theme: 'light',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuthenticate = Boolean(action.payload);
    },
    removeToken: state => {
      state.token = null;
      state.isAuthenticate = false;
    },
    setUser: (state, action: PayloadAction<TUserProfileApiResponse | null>) => {
      state.user = action.payload;
    },
    cleanUserData: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticate = false;
    },
    toggleLocalTheme: state => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const {
  setToken,
  removeToken,
  setUser,
  toggleLocalTheme,
  cleanUserData,
} = authSlice.actions;

export default authSlice.reducer;

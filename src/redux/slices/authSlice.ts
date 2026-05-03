import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthUser = {
  id?: number | string;
  name?: string;
  email?: string;
  [key: string]: unknown;
};

type AuthState = {
  token: string | null;
  user: AuthUser | null;
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
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
    },
    toggleLocalTheme: state => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      state.user = {
        ...(state.user ?? {}),
        ...action.payload,
      };
    },
  },
});

export const { setToken, removeToken, setUser, updateUser, toggleLocalTheme } =
  authSlice.actions;

export default authSlice.reducer;

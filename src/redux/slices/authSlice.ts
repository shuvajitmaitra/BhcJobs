import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthUser = {
  id?: number | string;
  name?: string;
  email?: string;
};

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user?: AuthUser | null }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user ?? null;
      state.isAuthenticated = true;
    },
    updateUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
    },
    clearAuth: state => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, updateUser, clearAuth } = authSlice.actions;

export default authSlice.reducer;

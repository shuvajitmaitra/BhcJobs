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
};

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticate: false,
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
    updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      state.user = {
        ...(state.user ?? {}),
        ...action.payload,
      };
    },
  },
});

export const { setToken, removeToken, setUser, updateUser } =
  authSlice.actions;

export default authSlice.reducer;

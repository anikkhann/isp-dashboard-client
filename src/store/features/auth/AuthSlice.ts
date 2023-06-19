import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

interface AuthState {
  isLoading: boolean;
  isInitialized: boolean;
  isLoggedIn: boolean;
  user: object | null;
}

const initialState: AuthState = {
  isLoading: true,
  isInitialized: false,
  isLoggedIn: false,
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setUser(state, action: PayloadAction<object | null>) {
      state.user = action.payload;
    },

    logout: state => {
      state.isLoggedIn = false;
      state.user = null;
      Cookies.remove("token");
    }
  }
});

export const { setIsLoading, setInitialized, setIsLoggedIn, logout } =
  authSlice.actions;

export default authSlice.reducer;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

interface AuthState {
  isLoading: boolean;
  isInitialized: boolean;
  isLoggedIn: boolean;
  user: UserLoggedInData | null;
}

export interface UserLoggedInData {
  userId: string;
  name: string;
  firstName?: any;
  userName: string;
  lastName?: any;
  email: string;
  phone: string;
  profileImg?: any;
  roleId?: any;
  roleName?: any;
  roleCode?: any;
  designation?: any;
  userType: string;
  userCategory?: any;
  partnerId?: any;
  parentPartnerId?: any;
  partnerUsername: string;
  partnerIp: string;
  credit: number;
  lastLoginTime: number;
  lastLoginIp: string;
  token: string;
  masterUser: boolean;
  clientLevel?: string;
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
    setUser(state, action: PayloadAction<UserLoggedInData>) {
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

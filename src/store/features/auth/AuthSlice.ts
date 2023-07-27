import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

interface AuthState {
  isLoading: boolean;
  isInitialized: boolean;
  isLoggedIn: boolean;
  user: UserLoggedInData | null;
}

interface UserLoggedInData {
  userId: string;
  name: string;
  firstName: string;
  userName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImg: string;
  roleId: string;
  roleName: string;
  roleCode: string;
  designation: string;
  userType: string;
  partnerId: string;
  parentPartnerId: string;
  partnerUsername: string;
  partnerIp: string;
  credit: string;
  token: string;
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

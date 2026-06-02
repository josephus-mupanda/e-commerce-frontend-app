import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "ADMIN" | "CUSTOMER";

export interface AuthUser {
  sessionId: string;
  username: string;
  role: UserRole;
  accessToken?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

const savedSessionId = sessionStorage.getItem("sessionId");
const savedRole = sessionStorage.getItem("userRole") as UserRole | null;
const savedUsername = sessionStorage.getItem("username");
const savedAccessToken =
  sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken");

const initialState: AuthState = {
  user:
    savedSessionId && savedRole && savedAccessToken
      ? {
          sessionId: savedSessionId,
          role: savedRole,
          username: savedUsername || "User",
          accessToken: savedAccessToken,
        }
      : null,
  isAuthenticated: Boolean(savedSessionId && savedRole && savedAccessToken),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      sessionStorage.setItem("sessionId", action.payload.sessionId);
      sessionStorage.setItem("userRole", action.payload.role);
      sessionStorage.setItem("username", action.payload.username);
      if (action.payload.accessToken) {
        sessionStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("accessToken", action.payload.accessToken);
      }
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.clear();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export default authSlice.reducer;

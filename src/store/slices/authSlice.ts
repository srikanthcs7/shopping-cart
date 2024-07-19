import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {} | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      //side effect, can be handle through middleware
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

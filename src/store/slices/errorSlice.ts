import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorInfo {
  open: boolean;
  message: string;
  severity: string;
}

const initialState: ErrorInfo = { open: false, message: "", severity: "" };

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    showError: (state, action: PayloadAction<ErrorInfo>) => {
      state.open = action.payload.open;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
  },
});

export const { showError } = errorSlice.actions;
export default errorSlice.reducer;

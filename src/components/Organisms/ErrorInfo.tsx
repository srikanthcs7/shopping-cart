import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { showError } from "../../store/slices/errorSlice";

const ErrorInfo: React.FC = () => {
  const { open, severity, message } = useSelector(
    (state: RootState) => state.error
  );
  const dispatch = useDispatch();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={3000}
      onClose={() =>
        dispatch(showError({ open: false, message: "", severity: "" }))
      }
    >
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorInfo;

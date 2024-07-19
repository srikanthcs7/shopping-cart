import React from "react";
import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { login } from "../store/slices/authSlice";
import { useNavigate, Navigate } from "react-router-dom";
import { RootState } from "../store/store";
import axiosClient from "../utils/axiosClient";
import { showError } from "../store/slices/errorSlice";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showReg, toggleRegistration] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  if (localStorage.getItem("token")) {
    return <Navigate to="/" replace={true} />;
  }

  const handleRegistration = async () => {
    try {
      const resp: any = await axiosClient.post("/auth/register", {
        name: username,
        password,
        email,
      });
      if (resp.status === 201) {
        localStorage.setItem("token", resp.token);
        dispatch(
          login({
            name: resp.name,
            token: resp.token,
            refreshToken: resp.refreshToken,
          })
        );
        navigate("/", { replace: true });
      }
    } catch (e) {}
  };

  const handleLogin = async () => {
    let messageInfo = "Login successful";
    let error = true;
    try {
      const resp: any = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      if (resp.status === 200) {
        localStorage.setItem("token", resp.token);
        dispatch(
          login({
            name: resp.name,
            token: resp.token,
            refreshToken: resp.refreshToken,
          })
        );
        navigate("/", { replace: true });
        error = false;
      } else {
        messageInfo = "Email or Password is invalid";
      }
    } catch (e) {
      messageInfo = "Something went wrong! Please enter valid credentials";
    } finally {
      dispatch(
        showError({
          open: true,
          severity: error ? "error" : "success",
          message: messageInfo,
        })
      );
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
    >
      <Grid
        item
        sx={{
          width: { xs: "100%", md: "50%" },
          height: { xs: "auto", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            padding: 4,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {showReg && (
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <Box
            display="flex"
            flexDirection={"column"}
            gap="8px"
            // justifyContent={"space-between"}
            width={"100%"}
            alignItems={"center"}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={showReg ? handleRegistration : handleLogin}
              sx={{ marginTop: 2 }}
            >
              {showReg ? "Register" : "Login"}
            </Button>
            <Link>Forgot password</Link>
            {!showReg && (
              <Link onClick={() => toggleRegistration(!showReg)}>
                Register Now
              </Link>
            )}
            {showReg && (
              <Link onClick={() => toggleRegistration(!showReg)}>Login</Link>
            )}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;

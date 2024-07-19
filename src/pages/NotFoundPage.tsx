import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const naviate = useNavigate();
  return (
    <Box
      flexDirection={"column"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={"100%"}
    >
      <Typography variant="h5">404 - Not Found</Typography>
      <p>The page you are looking for does not exist.</p>
      <Button
        variant="contained"
        onClick={() => naviate("/", { replace: true })}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;

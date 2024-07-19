// src/components/Header.tsx
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Grid, Card, Box, Badge, Typography, Button } from "@mui/material";
import { RootState } from "../../store/store";
import { logout } from "../../store/slices/authSlice";

const StyledHeader = styled(Card)(() => ({
  padding: "16px",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "space-between",
  position: "sticky",
  top: 0,
  zIndex: 100,
}));

const StyledDot = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  right: "12px",
}));

const Header: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartLength = cart.reduce(
    (acc, curr) => {
      let cur = acc.quantity + curr.quantity;
      return { quantity: cur };
    },
    { quantity: 0 }
  );

  const onLogOut = () => {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  };

  return (
    <StyledHeader>
      <Box>
        <Typography
          onClick={() => navigate("/")}
          variant="h5"
          color="primary"
          sx={{ fontWeight: 800, cursor: "pointer" }}
        >
          Shop Now
        </Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent="flex-end"
        gap="32px"
        alignItems="center"
      >
        <Box>
          {user ? (
            <Box display={"flex"} gap="8px" alignItems={"center"}>
              <Typography variant="subtitle2">
                {`Welcome, ${user.name}`}
              </Typography>
              <Button size="small" variant="contained" onClick={onLogOut}>
                Logout
              </Button>
            </Box>
          ) : (
            <Typography
              sx={{ cursor: "pointer" }}
              color="primary"
              variant="subtitle2"
            >
              Login
            </Typography>
          )}
        </Box>
        <Badge
          onClick={() => navigate("/cart")}
          badgeContent={cartLength.quantity || 0}
          color="primary"
          sx={{ cursor: "pointer" }}
        >
          <ShoppingCartOutlinedIcon color="action" />
        </Badge>
      </Box>
    </StyledHeader>
  );
};

export default Header;

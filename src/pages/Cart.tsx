import React, { useEffect } from "react";
import { Box, Typography, Card } from "@mui/material";
import AddToCart from "../components/Molecules/AddToCartButton";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CartItem } from "../types/cart";

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <Box width={"100%"}>
      <Typography variant="h4">Cart</Typography>
      <Box
        display={"flex"}
        flexDirection={"column"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {cart.length == 0 && <Typography>No items in Cart</Typography>}
        {cart.map((item: CartItem) => {
          return (
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "60%",
                padding: "16px",
                marginBottom: "16px",
              }}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap="4px"
                width="80%"
              >
                <Typography variant="subtitle2">{item.title}</Typography>
                <Typography variant="subtitle1">${item.price}</Typography>
              </Box>
              <AddToCart product={item} onAddToCart={() => {}} />
            </Card>
          );
        })}
      </Box>
      {/* Cart items will be listed here */}
    </Box>
  );
};

export default Cart;

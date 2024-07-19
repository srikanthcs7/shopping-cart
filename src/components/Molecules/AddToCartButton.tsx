// src/components/AddToCart.tsx
import React, { useState } from "react";
import { IconButton, Typography, Button, Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/store";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../../store/slices/cartSlice";
import { CartItem, AddToCartProps } from "../../types/cart";
import { showError } from "../../store/slices/errorSlice";

const StyledGrid = styled(Grid)(() => ({
  border: "1px solid #c98ca7",
  borderRadius: "4px",
}));

const AddToCart: React.FC<AddToCartProps> = ({ onAddToCart, product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const currentItem: CartItem | undefined = cart.find(
    (item) => item.id === product.id
  );
  const currentQuantity: number = (currentItem && currentItem.quantity) || 0;

  const handleIncrease = () => {
    if (!currentItem) return;
    if (currentQuantity < currentItem?.stock) {
      dispatch(
        updateQuantity({ id: product.id, quantity: currentQuantity + 1 })
      );
    } else {
      dispatch(
        showError({
          open: true,
          message: "Stock unavailable",
          severity: "error",
        })
      );
    }
  };

  const handleDecrease = () => {
    if (currentQuantity - 1 === 0) {
      if (currentItem) dispatch(removeFromCart(currentItem.id));
    }
    if (currentQuantity > 0) {
      dispatch(
        updateQuantity({ id: product.id, quantity: currentQuantity - 1 })
      );
    }
  };

  const handleAddToCart = () => {
    handleIncrease();
    onAddToCart(currentQuantity);
    dispatch(addToCart(product));
  };

  return (
    <Box display="flex" alignItems="center">
      {currentItem?.quantity ? (
        <StyledGrid container alignContent={"center"} width={"100%"}>
          <Grid
            item
            xs={3}
            container
            justifyContent={"center"}
            sx={{ backgroundColor: "#c98ca7", cursor: "pointer" }}
          >
            <IconButton onClick={handleDecrease} disabled={currentQuantity < 1}>
              <RemoveIcon />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={6}
            container
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography>{currentItem?.quantity}</Typography>
          </Grid>
          <Grid
            xs={3}
            container
            justifyContent={"center"}
            sx={{ backgroundColor: "#c98ca7", cursor: "pointer" }}
          >
            <IconButton
              onClick={handleIncrease}
              // disabled={currentQuantity >= currentItem.stock}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </StyledGrid>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleAddToCart}
          disabled={currentItem && currentItem.stock === 0}
        >
          {currentItem && currentItem.stock === 0
            ? "unavailable"
            : "Add to Cart"}
        </Button>
      )}
    </Box>
  );
};

export default AddToCart;

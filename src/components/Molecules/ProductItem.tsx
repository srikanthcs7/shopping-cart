import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Chip, Card, Box, Typography, Grid } from "@mui/material";

import AddToCart from "./AddToCartButton";
import { CartItem } from "../../types/cart";

/*
   1. Text and all the info
   2. Add to cart CTA
   3. Remove from cart CTA
   4. OnClick either we can have here or use event delagation at Products page
  */

const StyledCard = styled(Card)(() => ({
  padding: "8px",
  display: "flex",
  flexDirection: "column",
}));

interface ProductItemProps {
  product: CartItem;
  onItemClick: (id: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onItemClick }) => {
  const { image, title, category, price, id } = product;

  return (
    <StyledCard key={id}>
      <Box
        display={"flex"}
        justifyContent={"center"}
        onClick={() => onItemClick(id)}
        sx={{ cursor: "pointer" }}
      >
        <img src={image} width={"150px"} height={"150px"} loading="lazy" />
      </Box>
      <Grid
        gridTemplateRows={"40% 20% 40%"}
        gap="10px"
        flexDirection={"column"}
        width={"100%"}
        height={"100%"}
        padding={"8px"}
      >
        <Chip
          size="small"
          label={category}
          variant="outlined"
          sx={{ maxWidth: "max-content" }}
        />
        <Typography variant="h6">{title}</Typography>
        {/* <Typography variant="subtitle1">{category}</Typography> */}

        <Typography variant="subtitle1">${price}</Typography>
        {/* <Button variant="outlined">Add to cart</Button> */}
      </Grid>
      <AddToCart product={product} onAddToCart={() => {}} />
    </StyledCard>
  );
};

export default ProductItem;

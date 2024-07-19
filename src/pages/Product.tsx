import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddToCart from "../components/Molecules/AddToCartButton";
import axiosClient from "../utils/axiosClient";

const StyledImage = styled(Card)(() => ({
  padding: "16px",
  alignItems: "center",
  // width: "60%",
}));

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const resp = await axiosClient.get(`/products/${id}`);
      setProduct(resp);
    })();
  }, []);

  if (!product) return <div>Loading..</div>;

  return (
    <Box
      margin={"24px"}
      display={"flex"}
      flexDirection={"row"}
      gap="24px"
      flexWrap={"wrap"}
      height="100%"
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        height="100%"
        gap="32px"
        width={{ xs: "100%", md: "60%" }}
      >
        <StyledImage>
          <img
            src={product.image}
            style={{ aspectRatio: "16/9" }}
            width={"100%"}
            height={"100%"}
            alt={product.title}
          />
        </StyledImage>
        <Box display={"flex"} flexDirection={"column"} gap={"8px"}>
          <Typography variant="subtitle2">Product Description:</Typography>
          <Typography>{product.description}</Typography>
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"} flexGrow={"1"} gap={"8px"}>
        <Chip
          size="small"
          label={product.category}
          variant="outlined"
          sx={{ maxWidth: "max-content" }}
        />
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="h6" sx={{ margin: "16px 0" }}>
          ${product.price}
        </Typography>
        <Box width="50%">
          <AddToCart product={product} onAddToCart={() => {}} />
        </Box>
      </Box>
    </Box>
  );
};

export default Product;

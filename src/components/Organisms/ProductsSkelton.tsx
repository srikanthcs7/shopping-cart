import React, { ReactNode } from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box, Card } from "@mui/material";

interface ProductsSkeletonProps {
  count?: number;
}

const ProductsSkelton: React.FC<ProductsSkeletonProps> = ({ count }) => {
  const renderLists = (): ReactNode[] => {
    return Array.from({ length: count || 15 }, (_, i) => (
      <Card
        key={i}
        sx={{ padding: "8px", display: "flex", flexDirection: "column" }}
      >
        <Box display={"flex"} justifyContent={"center"}>
          <Skeleton variant="rectangular" width={"100%"} height={118} />
        </Box>
        <Box
          display={"flex"}
          gap={"4px"}
          flexDirection={"column"}
          width={"100%"}
          padding={"8px"}
        >
          <Skeleton width="50%" />
          <Skeleton width="50%" />
        </Box>
        <Skeleton variant="rectangular" height={30} width={"100%"} />
      </Card>
    ));
  };
  return renderLists();
};

export default ProductsSkelton;

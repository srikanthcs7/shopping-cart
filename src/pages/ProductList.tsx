import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import ProductItem from "../components/Molecules/ProductItem";
import ProductsSkeleton from "../components/Organisms/ProductsSkelton";
import { CartItem } from "../types/cart";

type Products = {
  resources: CartItem[];
  count: number;
  total: number;
};

const Home: React.FC = () => {
  const [products, setProducts] = useState<Products>({
    resources: [],
    count: 0,
    total: 0,
  });
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      threshold: 0.6,
    });

    if (observer.current && products.resources.length > 0) {
      observer.current.observe(
        document.querySelector(".infinite-scroll-trigger") as Element
      );
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [products.resources]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = `/products?page=${page}&size=10`;
      const response: Products = await axiosClient.get(url);

      if (response.resources.length === 0) {
        observer.current?.disconnect();
        return;
      }

      setProducts({
        resources: [...products.resources, ...response.resources],
        count: response.count,
        total: response.total,
      });
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleObserver: IntersectionObserverCallback = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      console.log("inst");
      fetchProducts();
    }
  };

  const navigateToProduct = (id: number): void => {
    navigate(`/product/${id}`);
  };

  const optimisedSearch = () => {
    let timer: NodeJS.Timeout;

    return (value: string) => {
      if(timer)
      clearTimeout(timer);
      timer = setTimeout(() => {
        setSearchTerm(value);

        setPage(1);
      }, 500);
    };
  };

  const handleSearch = optimisedSearch();

  const onProductSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearch(value);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <Box margin="8px">
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="Search.."
          fullWidth
          InputLabelProps={{ shrink: true }}
          onChange={onProductSearch}
          value={searchTerm}
        />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap={2}
        flexDirection={"column"}
        justifyContent={"center"}
        margin="8px"
      >
        {loading && <ProductsSkeleton />}
        {products.resources.length === 0 && (
          <Typography>No Products</Typography>
        )}
        {products.resources.map((product: any, index: number) => (
          <ProductItem
            key={product.id}
            product={product}
            onItemClick={navigateToProduct}
          />
        ))}
        <div className="infinite-scroll-trigger" style={{ height: "10px" }} />
        {loading && <ProductsSkeleton count={5} />}
      </Box>
    </Box>
  );
};

export default Home;

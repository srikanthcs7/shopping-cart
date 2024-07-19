import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Header from "./components/Molecules/Header";
import Layout from "./pages/Layout";
import PrivateRoutes from "../src/components/Organisms/PrivateRoutes";
import Login from "./pages/Login";
import ErrorInfo from "./components/Organisms/ErrorInfo";
import NotFound from "./pages/NotFoundPage";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* Abstract this routes to Layout for private */}
      <PrivateRoutes>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/search" element={<Search />} /> */}
            {/* <Route path="/bad-request" element={<BadRequest />} />  */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </PrivateRoutes>
      <ErrorInfo />
    </div>
  );
};

export default App;

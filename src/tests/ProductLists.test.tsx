import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Home from "../pages/ProductList";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Home", () => {
  const renderHome = () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders no products", async () => {
    renderHome();
    expect(screen.getByText(/no products/i)).toBeInTheDocument();
  });

  it("renders products after fetching", async () => {
    const products = {
      resources: [
        {
          id: 1,
          title: "Product 1",
          price: 100,
          image: "",
          quantity: 0,
          stock: 5,
        },
      ],
      count: 1,
      total: 1,
    };
    mockedAxios.get.mockResolvedValueOnce({ data: products });
    renderHome();

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });
  });
});

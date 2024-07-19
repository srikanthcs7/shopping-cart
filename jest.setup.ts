import "@testing-library/jest-dom";

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    // Add other methods you use from Axios
  })),
}));

const observe = jest.fn();
const unobserve = jest.fn();

(window as any).IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
}));

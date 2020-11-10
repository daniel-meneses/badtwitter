import "@testing-library/jest-dom/extend-expect";

declare global {
    interface Window { __INITIAL_STATE_: any; }
  }
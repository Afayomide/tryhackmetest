import { createBrowserRouter } from "react-router-dom";
import App from "./app";
import Home from "./components/home";
import SearchResult from "./components/search-result";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { element: <Home />, path: "/" },
      { element: <SearchResult />, path: "/hotels/:id" },
    ],
  },
]);

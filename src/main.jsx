import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.jsx";
import { ChakraProvider} from "@chakra-ui/react";
import theme from "./utils/theme.js";
import MovieDetails from "./pages/MovieDetails.jsx";
import PeopleDetails from "./pages/PeopleDetails.jsx";
import Discover from "./pages/Discover.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details/:type/:id",
        element: <MovieDetails />
      },
      {
        path: "/cast-details/:id",
        element: <PeopleDetails />
      },
      {
        path: "/discover",
        element: <Discover />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

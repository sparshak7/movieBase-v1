import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./utils/theme.js";
import MovieDetails from "./pages/MovieDetails.jsx";
import PeopleDetails from "./pages/PeopleDetails.jsx";
import Discover from "./pages/Discover.jsx";
import SignIn from "./pages/SignIn.jsx";
import { AuthProvider } from "./context/authProvider.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import Protected from "./components/Protected.jsx";
import Favorite from "./pages/Favorite.jsx";
import Login from "./pages/Login.jsx";

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
        element: <MovieDetails />,
      },
      {
        path: "/cast-details/:id",
        element: <PeopleDetails />,
      },
      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/watchlist",
        element: (
          <Protected>
            <Watchlist />
          </Protected>
        ),
      },
      {
        path: "/favorites",
        element: (
          <Protected>
            <Favorite />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

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
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";

// const persistor = persistStore(store);
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
        path: "/watchlist",
        element: (
          <Protected>
            <Watchlist />
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

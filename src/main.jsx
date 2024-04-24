import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, SignUp } from "./pages";
import { Authentication } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Authentication>
            <Home />
          </Authentication>
        ),
      },
      {
        path: "/login",
        element: (
          <Authentication authentication={false}>
            <Login />
          </Authentication>
        ),
      },
      {
        path: "/signup",
        element: (
          <Authentication authentication={false}>
            <SignUp />
          </Authentication>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

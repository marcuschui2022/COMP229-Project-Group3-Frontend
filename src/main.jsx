import React from "react";
import ReactDOM from "react-dom/client";
import { teal } from "@mui/material/colors";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LandingPage from "./routes/LandingPage";

// create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: teal[400],
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Outlet></Outlet>
      </>
    ),
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/dashboard", element: <Dashboard />, loader: ticketsLoader },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { teal } from "@mui/material/colors";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  // Routes,
  // Route,
  // useOutletContext,
} from "react-router-dom";
import LandingPage from "./routes/LandingPage";
import SignUp, { action as postNewUser } from "./routes/SignUp";
import Login, { action as postLogin } from "./routes/Login";
import Dashboard, { loader as ticketsLoader } from "./routes/Dashboard";
import CreateTicket, {
  action as postNewTicket,
  loader as createTickerLoader,
} from "./routes/CreateTicket";
import UpdateTicket, {
  loader as ticketByidLoader,
  action as updateTicketById,
} from "./routes/UpdateTicket";

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
      {
        path: "/create-ticket",
        element: <CreateTicket />,
        loader: createTickerLoader,
        action: postNewTicket,
      },
      {
        path: "/update-ticket/:id",
        element: <UpdateTicket />,
        loader: ticketByidLoader,
        action: updateTicketById,
      },
      {
        path: "/signup",
        element: <SignUp />,
        action: postNewUser,
      },
      {
        path: "/login",
        element: <Login />,
        action: postLogin,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      {/* <RouterProvider router={router} /> */}
      {/* <AuthProvider> */}
      <RouterProvider router={router} />
      {/* <Routes><Route element={<Outlet />}></Route></Routes> */}
      {/* </AuthProvider> */}
      {/* <AuthContext.Provider> */}
      {/* <CustomRouterProvider /> */}
      {/* </AuthContext.Provider> */}
    </ThemeProvider>
  </React.StrictMode>
);

// exports.AuthContext = AuthContext;

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
import Dashboard, { loader as ticketsLoader } from "./routes/Dashboard";
import CreateTicket, { action as postNewTicket } from "./routes/CreateTicket";
import UpdateTicket, {
  loader as ticketByidLoader,
  action as updateTicketById,
} from "./routes/UpdateTicket";
// import ErrorPage from "./error-page";

// create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: teal[400],
    },
  },
});

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LandingPage />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/createticket",
//     element: <CreateTicket />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/updateticket/:id",
//     element: <UpdateTicket />,
//     errorElement: <ErrorPage />,
//   },
// ]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LandingPage />,
//     children: [
//       {
//         path: "/Dashboard",
//         element: <Dashboard />,
//         loader: ticketsLoader,
//         // children: [
//         //   {
//         //     path: "/create-ticket",
//         //     element: <CreateTicket />,
//         //   },
//         // ],
//       },
//     ],
//   },
// ]);

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
        action: postNewTicket,
      },
      {
        path: "/update-ticket/:id",
        element: <UpdateTicket />,
        loader: ticketByidLoader,
        action: updateTicketById,
      },
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

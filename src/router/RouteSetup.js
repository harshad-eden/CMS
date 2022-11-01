import { lazy, Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";

const Dashboard = lazy(() => import("../Components/Dashboard"));
const Login = lazy(() => import("../Components/Login"));
const Employer = lazy(() => import("../Components/Employer"));
const Provider = lazy(() => import("../Components/Provider"));
const NotFound = lazy(() => import("../Components/404"));

const RouteSetup = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },
    {
      path: "/employer",
      element: (
        <PrivateRoute>
          <Employer />
        </PrivateRoute>
      ),
    },
    {
      path: "/provider",
      element: (
        <PrivateRoute>
          <Provider />
        </PrivateRoute>
      ),
    },
    { path: "/login", element: <Login /> },
    { path: "*", element: <NotFound /> },
  ]);
  return routes;
};

export default RouteSetup;

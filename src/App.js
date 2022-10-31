import { lazy, Suspense } from "react";

import { BrowserRouter as Router, useRoutes } from "react-router-dom";

const Dashboard = lazy(() => import("./Components/Dashboard"));
const Login = lazy(() => import("./Components/Login"));
const Employer = lazy(() => import("./Components/Employer"));
const Provider = lazy(() => import("./Components/Provider"));
const NotFound = lazy(() => import("./Components/404"));

function App() {
  const Routes = () => {
    let routes = useRoutes([
      { path: "/", element: <Dashboard /> },
      { path: "/employer", element: <Employer /> },
      { path: "/provider", element: <Provider /> },
      { path: "/login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ]);
    return routes;
  };

  return (
    <Suspense fallback={<h1>Loading..</h1>}>
      <Router>
        <Routes />
      </Router>
    </Suspense>
  );
}

export default App;

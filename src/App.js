import { Suspense } from "react";
import RouteSetup from "./router/RouteSetup";

import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Suspense fallback={<h1>Loading..</h1>}>
      <BrowserRouter>
        <RouteSetup />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

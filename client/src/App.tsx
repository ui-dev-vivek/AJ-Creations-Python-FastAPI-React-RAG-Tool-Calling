import { Route, Routes } from "react-router-dom";

import appRoutes from "./routes";

function App() {
  return (
    <Routes>
      {appRoutes.map((route, index) => (
        <Route key={index} element={route.element} path={route.path} />
      ))}
    </Routes>
  );
}

export default App;

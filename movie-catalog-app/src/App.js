import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import Auth from "./views/Auth/Auth";
import Home from "./views/Home";
import Comments from "./views/Comments/Comments";

import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/auth" element={<Auth />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/comments/:id" element={<Comments />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

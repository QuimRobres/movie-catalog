import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./index.css";

import Auth from "./views/Auth/Auth";
import Home from "./views/Home";
import Comments from "./views/Comments/Comments";

function App() {
  const userIsLogged = localStorage.getItem("token");

  
  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={!userIsLogged ? <Auth /> : <Navigate to="/" />}
        />

        <Route
          path="/"
          element={userIsLogged ? <Home /> : <Navigate to="/auth" />}
        />
        <Route
          path="/comments/:id"
          element={userIsLogged ? <Comments /> : <Navigate to="/auth" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

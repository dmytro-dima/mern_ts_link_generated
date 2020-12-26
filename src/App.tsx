import React from "react";
import { userRouters } from "./routers/routers";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth.hook";
import { NavBar } from "./components/navbar";
import { Loader } from "./components/loader";

function App() {
  const { logout, login, token, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const router = userRouters(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{ logout, login, token, userId, isAuthenticated }}
    >
      <Router>
        {isAuthenticated && <NavBar />}
        {router}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

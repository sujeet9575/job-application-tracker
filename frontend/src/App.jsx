import PrivateRoute from "./PrivateRoute";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";

import "./App.css";

function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">JobTracker</div>

      <div className="navbar-links">
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/add-job">Add Job</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const updateToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("authChanged", updateToken);

    return () => {
      window.removeEventListener("authChanged", updateToken);
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar token={token} setToken={setToken} />
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />
    <Route
     path="/forgot-password"
     element={<ForgotPassword />}
    />
    <Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>
  <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />

  <Route
    path="/add-job"
    element={
      <PrivateRoute>
        <AddJob />
      </PrivateRoute>
    }
  />

  <Route
    path="/edit-job/:id"
    element={
      <PrivateRoute>
        <EditJob />
      </PrivateRoute>
    }
  />
</Routes>
    </BrowserRouter>
  );
}

export default App;

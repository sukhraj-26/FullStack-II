import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

function ProtectedRoute({ children }) {

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  return isAuthenticated
    ? children
    : <Navigate to="/" />;
}

function DashboardPage() {

  return (

    <div className="container">

      <Navbar />

      {/* Header */}

      <header className="hero">

        <div className="hero-left">

          <div className="logo-circle">

            🚀

          </div>

          <div>

            <h1 className="title">

              Social Media Dashboard

            </h1>

            <p className="subtitle">

              Manage your social media posts using{" "}

              <strong>

                Redux Toolkit

              </strong>

              {" "}with JWT Authentication,

              Role-Based Access Control,

              Memoized Selectors,

              Image Uploads,

              File Attachments,

              and Emoji Support.

            </p>

          </div>

        </div>

        <div className="hero-right">

          <span className="badge live">

            🟢 Live

          </span>

          <span className="badge redux">

            ⚛ Redux Toolkit

          </span>

          <span className="badge memo">

            ⚡ Memoized Selectors

          </span>

          <span className="badge auth">

            🔐 JWT Auth

          </span>

          <span className="badge role">

            👥 RBAC

          </span>

        </div>

      </header>

      {/* Statistics */}

      <Dashboard />

      {/* Create / Edit */}

      <PostForm />

      {/* Posts */}

      <PostList />

    </div>

  );

}

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>

            <DashboardPage />

          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <Navigate to="/" />
        }
      />

    </Routes>

  );

}

export default App;
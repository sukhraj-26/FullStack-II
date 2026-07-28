import "./App.css";

import Dashboard from "./components/Dashboard";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

function App() {
  return (
    <div className="container">

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
              Create, edit and manage your social media posts using
              <strong> Redux Toolkit</strong> with memoized selectors for
              efficient state management.
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

        </div>

      </header>

      {/* Dashboard */}

      <Dashboard />

      {/* Create Post */}

      <PostForm />

      {/* Posts */}

      <PostList />

    </div>
  );
}

export default App;
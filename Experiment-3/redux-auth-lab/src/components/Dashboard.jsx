import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const posts = useSelector(
    (state) => state.posts.posts
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const totalPosts = posts.length;

  const publishedPosts = posts.filter(
    (post) => post.status === "Published"
  ).length;

  const draftPosts = posts.filter(
    (post) => post.status === "Draft"
  ).length;

  const pinnedPosts = posts.filter(
    (post) => post.pinned
  ).length;

  const totalLikes = posts.reduce(
    (sum, post) => sum + post.likes,
    0
  );

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div>

          <h2>📊 Dashboard</h2>

          <p>
            Welcome,
            <strong> {user?.username}</strong>
          </p>

          <p>
            Role :
            <strong> {user?.role}</strong>
          </p>

          <p>
            Authentication :
            <span className="auth-success">
              {" "}
              ✅ Logged In
            </span>
          </p>

        </div>

        <button
          className="logout-btn"
          onClick={() => dispatch(logout())}
        >
          🚪 Logout
        </button>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>{totalPosts}</h3>
          <p>Total Posts</p>
        </div>

        <div className="stat-card">
          <h3>{publishedPosts}</h3>
          <p>Published</p>
        </div>

        <div className="stat-card">
          <h3>{draftPosts}</h3>
          <p>Drafts</p>
        </div>

        <div className="stat-card">
          <h3>{pinnedPosts}</h3>
          <p>Pinned</p>
        </div>

        <div className="stat-card">
          <h3>{totalLikes}</h3>
          <p>Total Likes</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
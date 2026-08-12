import { useSelector } from "react-redux";

function ViewerPage() {

  const user = useSelector(
    (state) => state.auth.user
  );

  return (

    <div className="page-container">

      <div className="page-card">

        <h1>👀 Viewer Dashboard</h1>

        <p>

          Welcome,
          <strong> {user?.username}</strong>

        </p>

        <h2>Viewer Permissions</h2>

        <ul>

          <li>✅ View Posts</li>

          <li>✅ Like Posts</li>

          <li>❌ Create Posts</li>

          <li>❌ Edit Posts</li>

          <li>❌ Delete Posts</li>

          <li>❌ Pin Posts</li>

          <li>❌ Manage Users</li>

          <li>❌ View Analytics</li>

        </ul>

      </div>

    </div>

  );

}

export default ViewerPage;
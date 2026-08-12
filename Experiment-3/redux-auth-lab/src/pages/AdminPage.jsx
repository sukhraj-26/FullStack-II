import { useSelector } from "react-redux";

function AdminPage() {

  const user = useSelector(
    (state) => state.auth.user
  );

  return (

    <div className="page-container">

      <div className="page-card">

        <h1>👑 Admin Dashboard</h1>

        <p>

          Welcome,
          <strong> {user?.username}</strong>

        </p>

        <h2>Admin Permissions</h2>

        <ul>

          <li>✅ Create Posts</li>

          <li>✅ Edit Posts</li>

          <li>✅ Delete Posts</li>

          <li>✅ Pin Posts</li>

          <li>✅ Like Posts</li>

          <li>✅ View Analytics</li>

          <li>✅ Manage Users</li>

        </ul>

      </div>

    </div>

  );

}

export default AdminPage;
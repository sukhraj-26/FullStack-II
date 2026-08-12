import { useSelector } from "react-redux";

function EditorPage() {

  const user = useSelector(
    (state) => state.auth.user
  );

  return (

    <div className="page-container">

      <div className="page-card">

        <h1>✏️ Editor Dashboard</h1>

        <p>

          Welcome,
          <strong> {user?.username}</strong>

        </p>

        <h2>Editor Permissions</h2>

        <ul>

          <li>✅ Create Posts</li>

          <li>✅ Edit Posts</li>

          <li>✅ Like Posts</li>

          <li>❌ Delete Posts</li>

          <li>❌ Pin Posts</li>

          <li>❌ Manage Users</li>

          <li>❌ View Admin Analytics</li>

        </ul>

      </div>

    </div>

  );

}

export default EditorPage;
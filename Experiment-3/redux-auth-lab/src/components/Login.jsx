import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../features/authSlice";

function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  // Mock users
  const users = [
    {
      username: "admin",
      password: "1234",
      role: "Admin",
    },
    {
      username: "editor",
      password: "1234",
      role: "Editor",
    },
    {
      username: "viewer",
      password: "1234",
      role: "Viewer",
    },
  ];

  const handleLogin = (e) => {

    e.preventDefault();

    setError("");

    const user = users.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (!user) {

      setError("Invalid username or password.");

      return;

    }

    // Simulated JWT Token
    const fakeToken = btoa(
      JSON.stringify({
        username: user.username,
        role: user.role,
        issuedAt: Date.now(),
      })
    );

    // Store token locally
    localStorage.setItem("jwtToken", fakeToken);

    dispatch(
      login({
        username: user.username,
        role: user.role,
        token: fakeToken,
      })
    );

    navigate("/dashboard");

  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h1>🔐 Redux Authentication Lab</h1>

        <p>

          JWT Authentication & Role Based Access Control

        </p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {error && (

            <p className="error">

              {error}

            </p>

          )}

          <button type="submit">

            Login

          </button>

        </form>

        <div className="demo-users">

          <h3>Demo Accounts</h3>

          <table>

            <tbody>

              <tr>

                <td><strong>Admin</strong></td>

                <td>admin</td>

                <td>1234</td>

              </tr>

              <tr>

                <td><strong>Editor</strong></td>

                <td>editor</td>

                <td>1234</td>

              </tr>

              <tr>

                <td><strong>Viewer</strong></td>

                <td>viewer</td>

                <td>1234</td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Login;
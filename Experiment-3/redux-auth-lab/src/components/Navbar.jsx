import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logout } from "../features/authSlice";

function Navbar() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const username = useSelector(
    (state) => state.auth.username
  );

  const role = useSelector(
    (state) => state.auth.role
  );

  const handleLogout = () => {

    dispatch(logout());

    toast.success("Logged out successfully!");

    navigate("/");

  };

  const getRoleClass = () => {

    switch (role) {

      case "Admin":
        return "admin-role";

      case "Editor":
        return "editor-role";

      case "Viewer":
        return "viewer-role";

      default:
        return "";

    }

  };

  return (

    <nav className="navbar">

      <div className="navbar-left">

        <h2>
          🚀 Redux Auth Lab
        </h2>

      </div>

      <div className="navbar-right">

        <span className="welcome">

          Welcome,

          <strong>

            {" "}{username}

          </strong>

        </span>

        <span className={`role-badge ${getRoleClass()}`}>

          {role}

        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          Logout

        </button>

      </div>

    </nav>

  );

}

export default Navbar;
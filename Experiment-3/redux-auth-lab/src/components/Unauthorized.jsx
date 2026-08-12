import { Link } from "react-router-dom";

function Unauthorized() {

  return (

    <div className="unauthorized-container">

      <div className="unauthorized-card">

        <h1>🚫 Access Denied</h1>

        <p>

          You do not have permission to access this page.

        </p>

        <p>

          Please login with an account that has the required role.

        </p>

        <Link to="/dashboard">

          <button>

            Back to Dashboard

          </button>

        </Link>

      </div>

    </div>

  );

}

export default Unauthorized;
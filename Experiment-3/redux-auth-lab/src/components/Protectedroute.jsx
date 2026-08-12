import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function ProtectedRoute({
  children,
  allowedRoles,
}) {

  const auth = useSelector(
    (state) => state.auth
  );


  // Safety check if auth reducer is missing
  if (!auth) {

    console.error(
      "Auth state missing. Check store.js reducer configuration."
    );

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }


  const {
    isAuthenticated,
    role,
  } = auth;



  // User not logged in

  if (!isAuthenticated) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }



  // Role restriction

  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {

    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );

  }



  return children;

}


export default ProtectedRoute;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuthorization = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const sessionId = sessionStorage.getItem("sessionId");
      const userRole = sessionStorage.getItem("userRole");

      if (!sessionId) {
        // User is not authenticated, redirect to login page
        navigate("/authentication-failed");
      } else if (!allowedRoles.includes(userRole)) {
        // User does not have the required role, show access denied
        navigate("/access-denied");
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuthorization;

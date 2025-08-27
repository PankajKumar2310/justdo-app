import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "@/lib/utils";

function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      try {
        await axios.get(`${API_BASE_URL}/api/v1/user/me`, { withCredentials: true });
        if (isMounted) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;



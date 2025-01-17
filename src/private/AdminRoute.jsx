import { AuthContext } from "@/authProvider/AuthProvider";
import LoadingScreen from "@/components/custom/Loading/LoadingScreen";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, role, loading } = useContext(AuthContext);
  if (loading) {
    return <LoadingScreen />;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/" />;
};

export default AdminRoute;

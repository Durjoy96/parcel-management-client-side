import { AuthContext } from "@/authProvider/AuthProvider";
import LoadingScreen from "@/components/custom/Loading/LoadingScreen";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;

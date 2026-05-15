import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  // ⏳ Wait for auth check
  if (loading) {
    return <div>Checking authentication...</div>;
  }

  // ❌ Not logged in or not admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Authorized
  return <>{children}</>;
};

export default ProtectedRoute;

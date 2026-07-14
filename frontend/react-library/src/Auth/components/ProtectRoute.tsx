import { useContext, type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { SpinnerLoading } from "../../layouts/Utils/SpinnerLoading";
import { AuthContext } from "../context/AuthContext";

export const ProtectRoute = ({ children }: { children: ReactElement }) => {
  const { session, loading } = useContext(AuthContext);
  console.log(session);

  if (loading) return <SpinnerLoading />;

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

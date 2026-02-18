import { Navigate } from "react-router-dom";
import { useLoginState } from "../provider/LoginStateProvider";
import { Button } from "primereact/button";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, logout } = useLoginState();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Button
        severity="secondary"
        label="Logout"
        onClick={logout}
        style={{ position: "absolute", top: "10px", right: "10px" }}
      />
      {children}
    </>
  );
};

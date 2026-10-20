import type { PropsWithChildren } from "react";
import { useAuthStore } from "../../auth/store/auth.store";
import { Navigate } from "react-router";

export const AutenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();
  if (authStatus === "cheking") return null;
  if (authStatus === "not-authentucated") return <Navigate to="/auth/login" />;

  return children;
};

export const NotAutenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();
  if (authStatus === "cheking") return null;
  if (authStatus === "autenticated") return <Navigate to="/" />;

  return children;
};

export const AdminRoute = ({ children }: PropsWithChildren) => {
  const { authStatus, isAdmin } = useAuthStore();
  if (authStatus === "cheking") return null;

  if (authStatus === "not-authentucated") return <Navigate to="/auth/login" />;

  if (!isAdmin()) return <Navigate to="/" />;

  return children;
};

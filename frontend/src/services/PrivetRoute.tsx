import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactNode } from "react";
import { RootState } from "../store/store"; // Import RootState from your Redux store

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivetRoute({ children }: PrivateRouteProps) {
  const token = useSelector((state: RootState) => state.auth.token); 
  const user = useSelector((state: RootState) => state.auth.user); 

  return token && user ? {children} : <Navigate to="/login" />;
}



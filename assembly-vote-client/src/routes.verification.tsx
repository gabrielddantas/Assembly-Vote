import { Navigate } from "react-router-dom";
import {
  getStorageData,
  keyStorage,
} from "./app/services/session-storage.service";
import { Login } from "./app/pages/Login";

export const ProtectedRoute = ({
  component: Component,
}: {
  component: React.ReactNode;
}) => {
  return getStorageData(keyStorage.associate) ? (
    <>{Component}</>
  ) : (
    <Navigate to="/login" />
  );
};

export const LoginRoute = () => {
  return !getStorageData(keyStorage.associate) ? (
    <Login />
  ) : (
    <Navigate to="/" />
  );
};

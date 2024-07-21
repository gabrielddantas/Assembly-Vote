import { createBrowserRouter } from "react-router-dom";
import type { Router } from "@remix-run/router";
import { LoginRoute, ProtectedRoute } from "./routes.verification";
import { Root } from "./app/components/root";

const Main = () => {
  return <p>Hello World</p>;
};

export const router: Router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginRoute />,
  },
  {
    path: "/",
    element: (
      <Root>
        <Main />
      </Root>
    ),
  },
]);

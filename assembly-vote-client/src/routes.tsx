import { createBrowserRouter } from "react-router-dom";
import type { Router } from "@remix-run/router";
import { LoginRoute, ProtectedRoute } from "./routes.verification";
import { Root } from "./app/components/root";
import { Session } from "./app/pages/session";
import { Schedule } from "./app/pages/schedule";

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
      <ProtectedRoute
        component={
          <Root>
            <Session />
          </Root>
        }
      />
    ),
  },
  {
    path: "/pauta/:sessionId",
    element: (
      <ProtectedRoute
        component={
          <Root>
            <Schedule />
          </Root>
        }
      />
    ),
  },
]);

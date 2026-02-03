
import { ReactNode } from "react";
import Login from "@/pages/authentication/Login";

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const authRoutes: RouteConfig[] = [
    {
        path: "/login",
        element: <Login />,
    }
];

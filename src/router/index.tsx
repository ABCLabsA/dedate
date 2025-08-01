import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ProjectList from "../pages/projects/ProjectList";
import About from "../components/About";
import NotFound from "../components/NotFound";
import BaseInfoProject from "@/pages/projects/BaseInfo";
import Login from "@/pages/auth/Login";
import LoginConfirm from "@/pages/auth/LoginConfirm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProjectList />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "login-confirm",
        element: <LoginConfirm />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "project-info/:id",
    element: <BaseInfoProject />,
  }
]); 
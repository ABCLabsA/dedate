import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ProjectList from "../pages/ProjectList";
import About from "../components/About";
import NotFound from "../components/NotFound";
import BaseInfoProject from "@/pages/BaseInfo";
import Login from "@/pages/Login";

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
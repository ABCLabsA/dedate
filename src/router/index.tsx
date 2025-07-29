import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ProjectList from "../components/ProjectList";
import About from "../components/About";
import NotFound from "../components/NotFound";
import BaseInfoProject from "@/pages/BaseInfo";

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
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "base-info/:id",
    element: <BaseInfoProject />,
  }
]); 
import { lazy } from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import Layout from "~/layout/Layout";
import lazyWrapper from "./lazyWrapper";

const routes: RouteObject[] = [
  {
    path: "login",
    element: lazyWrapper(lazy(() => import("~/pages/Login")))
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        path: "home",
        element: lazyWrapper(lazy(() => import("~/pages/Home"))),
        children: [
          {
            index: true,
            element: <Navigate to="/home/list-view" replace />
          },
          {
            path: "list-view",
            element: lazyWrapper(lazy(() => import("~/pages/Home/pages/ListView")))
          },
          {
            path: "graph-view",
            element: lazyWrapper(lazy(() => import("~/pages/Home/pages/GraphView")))
          },
          {
            path: "flow-view",
            element: lazyWrapper(lazy(() => import("~/pages/Home/pages/FlowView")))
          }
        ]
      },
      {
        path: "info",
        element: lazyWrapper(lazy(() => import("~/pages/Information")))
      }
    ]
  }
];

const router = createBrowserRouter(routes);

export default router;

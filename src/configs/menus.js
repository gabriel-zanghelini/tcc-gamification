import { lazy } from "react";

export const DEFAULT_PATH = "/home";

export const MENUS = [
  {
    name: "menus.home.title",
    icon: "home",
    path: "/home",
    view: lazy(() => import("views/HomeView")),
    sider: true,
  },
  {
    name: "menus.home.project_steps",
    icon: "project",
    path: "/project/edit",
    view: lazy(() => import("views/ProjectStepsView")),
    sider: false,
  },
];

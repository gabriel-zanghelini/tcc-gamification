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
    path: "/create/project",
    view: lazy(() => import("views/ProjectStepsView")),
    sider: false,
  },
];

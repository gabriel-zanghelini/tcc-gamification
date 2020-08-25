import { lazy } from "react";

export const DEFAULT_PATH = "/home";

export const MENUS = [
  {
    name: "menus.home",
    icon: "home",
    path: "/home",
    view: lazy(() => import("views/HomeView")),
  },
];

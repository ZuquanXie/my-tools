import { RouteRecordRaw } from "vue-router";

import { menus } from "@/views/menus";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
  },
  ...menus.map(menu => {
    return {
      path: menu.index,
      component: menu.component,
    };
  }),
];

export default routes;

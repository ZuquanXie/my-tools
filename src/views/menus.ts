import { RouteLocationRaw, RouteComponent } from "vue-router";
import { Switch } from "@element-plus/icons-vue";

type Menu = {
  index: string;
  route: RouteLocationRaw;
  disabled?: boolean;
  title: string;
  icon?: typeof Switch;
  component: RouteComponent | (() => Promise<RouteComponent>);
};

export const menus: Menu[] = [
  {
    index: "/transformer",
    route: { path: "/transformer" },
    title: "Transformer",
    icon: Switch,
    component: () => import("@/views/Transformer/index.vue"),
  },
];

import { RouteLocationRaw, RouteComponent } from "vue-router";
import { Switch, Baseball } from "@element-plus/icons-vue";

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
  {
    index: "/learningPinia",
    route: { path: "/learningPinia" },
    title: "LearningPinia",
    icon: Baseball,
    component: () => import("@/views/learningPinia/LearningPinia.vue"),
  },
  {
    index: "/pitch",
    route: { path: "/pitch" },
    title: "Pitch",
    icon: Baseball,
    component: () => import("@/views/pitch/PitchPanel.vue"),
  },
  {
    index: "/canvas/drawText",
    route: { path: "/canvas/drawText" },
    title: "CanvasDrawText",
    icon: Baseball,
    component: () => import("@/views/canvas/DrawText.vue"),
  },
  {
    index: "/canvas/movement",
    route: { path: "/canvas/movement" },
    title: "CanvasMovement",
    icon: Baseball,
    component: () => import("@/views/canvas/Movement.vue"),
  },
  {
    index: "/svg/drawText",
    route: { path: "/svg/drawText" },
    title: "SvgDrawText",
    icon: Baseball,
    component: () => import("@/views/svg/DrawText.vue"),
  },
];

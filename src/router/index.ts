import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// interface RouteMata {
//   title: string;
//   icon?: any;
// }
// interface RouteItem {
//   path: string;
//   name: string;
//   component: any;
//   redirect?: string;
//   hidden?: boolean;
//   meta: RouteMata;
//   children?: Array<any>;
// }
export const routes = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("pages/home/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/home",
    name: "/home",
    component: () => import("pages/home/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/work",
    name: "/work",
    component: () => import("pages/work/index.vue"),
    meta: {
      title: "工作",
    },
  },
  {
    path: "/settings",
    name: "/settings",
    component: () => import("pages/settings/index.vue"),
    meta: {
      title: "设置",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

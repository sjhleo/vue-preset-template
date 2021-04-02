import { RouteConfig } from "vue-router";
const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "welcome",
        component: () => import("@/views/welcome")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login")
    }
];
export default routes;

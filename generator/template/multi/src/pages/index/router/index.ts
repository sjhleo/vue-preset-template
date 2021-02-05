import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import NProgress from "nprogress";
import Cookies from "js-cookie";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "welcome",
        component: () => import("../views/welcome/index")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login")
    }
];

const router = new VueRouter({
    routes
});
router.beforeEach((to, from, next) => {
    let title = to.meta.title || "";
    NProgress.start();
    window.document.title = title;
    if (!Cookies.get("access_token") && to.name !== "login") {
        // 判断是否已经登录且前往的页面不是登录页
        next({ name: "login" });
    } else {
        next();
    }
});
router.afterEach(() => {
    NProgress.done();
});
export default router;

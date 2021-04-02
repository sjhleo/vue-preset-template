import Vue from "vue";
import axiosConfig from "./axios.config";
import iView from "view-design";
import components from "../utils/rename-iview-components";
import { style } from "@/assets/styles";
import VueRouter, { RouteConfig } from "vue-router";
import NProgress from "nprogress";
import Cookies from "js-cookie";
import Vuex from "vuex";
export default class Entry {
    public routes: Array<RouteConfig> = [];
    public storeModules: any = {};
    public constructor(routes: Array<RouteConfig>, storeModules: any) {
        this.routes = routes;
        this.storeModules = storeModules;
    }
    public init() {
        Vue.config.productionTip = false;
        style();
        Vue.use(iView);
        Vue.use(components);
        axiosConfig();
        Vue.prototype.$bus = new Vue();
        new Vue({
            router: this.routerInit(),
            store: this.storeInit(),
            template: "<div id='app'><router-view /></div>"
        }).$mount("#app");
    }
    public routerInit() {
        Vue.use(VueRouter);
        const router = new VueRouter({ routes: this.routes });
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
        return router;
    }
    public storeInit() {
        Vue.use(Vuex);
        return new Vuex.Store({ modules: this.storeModules });
    }
}

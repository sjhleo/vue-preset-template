import Vue from "vue";
import router from "./router";
import store from "./store";
import axiosConfig from "@/axios.config";
import iView from "view-design";
import components from "./utils/rename-iview-components";
// import "@/assets/styles/index.scss";
import { style } from "@/assets/styles";
Vue.config.productionTip = false;
style();
Vue.use(iView);
Vue.use(components);
axiosConfig();
new Vue({
    router,
    store,
    template: "<div id='app'><router-view /></div>"
}).$mount("#app");

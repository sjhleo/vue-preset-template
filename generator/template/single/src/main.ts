import Vue from "vue";
import App from "@/views/dashboard";
import router from "./router";
import store from "./store";
import axiosConfig from "@/axios.config";

Vue.config.productionTip = false;
axiosConfig();
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

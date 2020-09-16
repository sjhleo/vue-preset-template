import Vue from "vue";
import Vuex from "vuex";
import User from "./modules/user";
const modules = {
    user: new User()
};
Vue.use(Vuex);
export default new Vuex.Store({modules});


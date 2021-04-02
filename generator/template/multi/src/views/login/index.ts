import Cookies from "js-cookie";
import "./index.scss";
import autowired from "@/decorators/autowired";
import { commonSetting } from "@/settings";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import LoginService from "./service";

@Component({
    template: require("./index.html"),
    components: {}
})
export default class Login extends Vue {
    @autowired(LoginService)
    public loginService!: LoginService;

    public remember: boolean = false;

    public isLoading: boolean = false;

    // 用户名和密码的form对象
    public form: any = {
        username: "",
        password: ""
    };

    public rules: any = {
        username: [
            { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
    };

    public title: string = commonSetting.title || "数据服务";

    public onLogin(): void {
        this.isLoading = true;
        this.loginService
            .login(this.form.username, this.form.password)
            .then(res => {
                this.$store.commit("user/save", res.data);
                this.$router.push({ path: "/" });
            })
            .catch(error => {
                this.$Message.error("调用服务异常");
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    public onReset() {
        (this.$refs["loginForm"] as any).resetFields();
    }
    @Watch("remember", { immediate: false })
    public onRememberChanged(nv: boolean, ov: boolean) {
        if (nv) {
            Cookies.set("remember_login_name", this.form.username);
        }
    }

    public mounted() {
        let username = Cookies.get("remember_login_name");
        if (username) {
            this.form.username = username;
        }
    }
}

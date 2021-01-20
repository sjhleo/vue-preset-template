import Component from "vue-class-component";
import Vue from "vue";
import "./index.scss";
import TestService from "./service";
import autowired from "@/decorators/autowired";
@Component({
    template: require("./index.html")
})
export default class Dashboard extends Vue {
    @autowired(TestService)
    public service!: TestService;
    public async mounted() {
        await this.service.test();
        console.log(123);
    }
}

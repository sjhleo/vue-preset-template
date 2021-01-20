import service from "@/decorators/service";
import BaseService from "@/services/base-service";
/**
 * 业务服务基类。
 * @abstract
 * @class
 * @version 1.0.0
 */
export default class TestService extends BaseService {
    @service({ title: "测试"})
    public test() {
        return this._get<any>(
            "test"
        );
    }
}

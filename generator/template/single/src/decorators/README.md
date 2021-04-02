# 装饰器

## autowired 注解

与 java 的 autowired 注解类型类似，用于注入无参的构建方法的服务。

### 使用

```typescript
class Page {
    @autowired(Service)
    public service: Service;
}
```

## EventBroadcast EventSubscibe 注解

基于$bus 事件总线实现的广播机制

### 订阅

```typescript
export default class Subscribe {
    @subscibe("test")
    public received(params: any) {
        // 这里会打印 {msg: "hh"}
        console.log(params);
    }
}
```

_EventBroadcast 装饰的方法的返回值会随事件一起发送_

### 发布

```typescript
export default class Broadcast {
    @broadcast("test")
    public send() {
        return { msg: "hh" };
    }
}
```
## service注解

对异步请求进行切面错误处理，避免出现大量重复的try catch代码
### 使用
```typescript
export default class Service {
    @service("query")
    public async login(username: string, password: string): Promise<any> {
        return this._post("/v1/user/login", {
            username,
            password
        });
    }
}
```
*在页面中*
```typescript
    public async login() {
        let result = await this.service.login();
        ...
    }
```
而不用
```typescript
    public async login() {
        try {
            let result = await this.service.login();
        } catch(error) {

        }
        ...
    }
```
并且可以根据需求对接口的返回结果和提示做统一处理扩展。
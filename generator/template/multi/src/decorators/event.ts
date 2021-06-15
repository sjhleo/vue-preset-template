export function broadcast(eventName: string) {
    return function(target: any, name: any, descriptor: any) {
        // let method = target[name];
        // 这里给target原型赋值 是因为如果这里直接在target设置set方法，在组件内调用this的时候，this上面没有挂载set方法
        // 可能是vue内部对方法和属性处理有所不同，如果是属性则setter 和getter设置成功
        // Object.defineProperty(target.__proto__, name, {
        //     get: function() {
        //         return wrap(this, method, eventName);
        //     },
        //     set: function(value: any) {
        //         target[name] = value;
        //     }
        // });
        let method = descriptor.value;
        descriptor.value = function(...args: Array<any>) {
            wrap(this, method, eventName).call(null, ...args);
        };
    };
}
function wrap(target: any, method: Function, eventName: string) {
    return async (...args: Array<any>) => {
        let result = method.call(target, ...args);
        if (result instanceof Promise) {
            result = await result;
        }
        let param = result !== undefined ? [result] : args;
        target.$bus.$emit(eventName, ...param);
    };
}
export function subscibe(eventName: string) {
    return function(target: any, name: any, descriptor: any) {
        //  这里需要注意 订阅一定要在广播之前挂载 所以这里 是在created后就订阅，如果页面初始化需要广播事件，建议在mounted中，
        // 这里不在mounted中订阅就是因为如果广播和订阅都在mounted中，会出现订阅在广播之后，从而收不到广播
        let beforeMount = target["beforeMount"];
        target.beforeMount = function() {
            if (beforeMount) {
                beforeMount.call(this);
            }
            let method: Function = this[name];
            this.$bus.$on(eventName, method);
        };
        let beforeDestroy = target["beforeDestroy"];
        target.beforeDestroy = function() {
            if (beforeDestroy) {
                beforeDestroy.call(this);
            }
            let method: Function = this[name];
            this.$bus.$off(eventName, method);
        };
    };
}

import Vue, { DirectiveOptions, VNode } from "vue";
/**
 * 字符串类型v-model指令 针对字符串输入 过滤非法emoji字符
 */
export const smodel: DirectiveOptions = {
    bind: (el, binding, vnode) => {
        let arr = binding!.expression!.split(".");
        let target = getObject(arr, vnode);
        el.oninput = (event: any) => {
            target = getObject(arr, vnode);
            event.target.value = StringUtil.filterEmoji(
                event.target.value || ""
            );
            Vue.set(
                target as any,
                arr[arr.length - 1],
                binding.modifiers && binding.modifiers.trim
                    ? event.target.value.trim()
                    : event.target.value
            );
        };
    }
    // update: (el: any, binding, vnode) => {
    //     Vue.set(el.__vue__ ? el.__vue__ : el, "value", binding.value);
    // }
};
const getObject = (arr: Array<string>, vnode: VNode) => {
    let target: any = vnode.context;
    arr.forEach((v: string, index: number) => {
        if (index < arr.length - 1) {
            target = (target as any)[v];
        }
    });
    return target;
};
class StringUtil {
    public static filterEmoji(str: string) {
        let regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
        if (str.match(regRule)) {
            str = str.replace(
                /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,
                ""
            );
            console.log("不支持表情");
        }
        return str;
    }
}

import Vue, { DirectiveOptions, VNode } from "vue";
/**
 * 选择复制指令，选择即可复制
 */
export const selectCopy: DirectiveOptions = {
    bind: (el: any, binding, vnode: VNode) => {
        el.onselect = (event: any) => {
            document.execCommand("Copy"); // 执行浏览器复制命令
            // tslint:disable-next-line: no-unused-expression
            el.__vue__ && el.__vue__.$Message.success("复制成功");
            console.log("已复制好，可贴粘");
        };
    },
    unbind: (el, binding, vnode) => {
        el.onselect = null;
    }
};

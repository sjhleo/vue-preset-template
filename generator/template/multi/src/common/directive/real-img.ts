import { DirectiveFunction } from "vue";
export const realImg: DirectiveFunction = async function(el, binding) {
    let imgURL = el.getAttribute("src");
    let defaultURL = el.getAttribute("default-img");
    if (imgURL) {
        let exist = await imageIsExist(imgURL);
        if (exist) {
            el.setAttribute("src", imgURL);
        }
    } else if (defaultURL) {
        el.setAttribute("src", defaultURL);
    }
};
/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function(url: string) {
    return new Promise(resolve => {
        let img: HTMLImageElement | null = new Image();
        img.onload = function() {
            if (img!.complete) {
                resolve(true);
                img = null;
            }
        };
        img.onerror = function() {
            resolve(false);
            img = null;
        };
        img.src = url;
    });
};

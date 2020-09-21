const path = require("path");
const page = "all";
const pages = {
    page1: {
        name: "page1",
        entry: "src/pages/page1/main.ts",
        template: "public/index.html",
        filename: "page1.html",
        title: "页面1",
        chunks: ["chunk-vendors", "chunk-common", "page1"]
    },
    page2: {
        name: "page2",
        entry: "src/pages/page2/main.ts",
        template: "public/index.html",
        filename: "page2.html",
        title: "页面2",
        chunks: ["chunk-vendors", "chunk-common", "page2"]
    },
    index: {
        name: "index",
        entry: "src/pages/index/main.ts",
        template: "public/index.html",
        filename: "index.html",
        title: "主页",
        chunks: ["chunk-vendors", "chunk-common", "index"]
    }
};
if (page !== "all") {
    let v = pages[page];
    if (v) {
        v.name = "index";
        v.filename = "index.html";
        v.chunks = ["chunk-vendors", "chunk-common", "index"];
        pages = { index: v };
    }
}
// 修改插件配置
let htmlPlugins = pages ? Object.keys(pages).map((g) => "html-" + g) : ["html"];

const plugin = (config) => {
    htmlPlugins.forEach((v) => {
        config.plugin(v).tap((args) => {
            if (args[0]) {
                args[0].minify = {
                    removeComments: true,
                    collapseWhitespace: false,
                    removeAttributeQuotes: false
                };
            }
            return args;
        });
    });
};

module.exports = {
    pages: pages,
    plugin: plugin
};

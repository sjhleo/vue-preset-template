module.exports = [
    {
        type: "list",
        name: "mode",
        message: "单页面项目or多页面项目",
        choices: [
            {name: "单页面", value: "single"},
            {name: "多页面", value: "multi"}
        ],
        default: "single"
    }
];
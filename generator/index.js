module.exports = (api, opts) => {
    api.extendPackage({
      dependencies: {
        "axios": "^0.19.2"
      },
      devDependencies: {
        "raw-loader": "^1.0.0"
      },
      scripts: {
        check: "http-server ./dist -a 127.0.0.1 -p 5050",
      }
    })
    // 删除 vue-cli3 默认目录
    api.render(files => {
      Object.keys(files)
        .filter(path => path.startsWith("src/"))
        .forEach(path => delete files[path])
        delete files["src/tslint.json"]
    })
  
    api.render(`./template/${opts.mode}`)
  
    // 屏蔽 generator 之后的文件写入操作
    // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
    api.onCreateComplete(() => {
      process.env.VUE_CLI_SKIP_WRITE = true
    })
  }
const express = require('express');
// 获取express实例
const app = express();
// #todo 抽成工具类
const resolve = dir => require('path').resolve(__dirname, dir);
// 1. 静态目录开放 dist/client
app.use(express.static(resolve('../dist/client'), { index: false })) // 关闭express.static自动加载首页功能

// 判断当前执行环境
const isDev = process.env.NODE_ENV === 'development'
// 2.获取bundlerenderer渲染器实例
const { createBundleRenderer } = require('vue-server-renderer');

let renderer;

function createRenderer() {
  const bundle = resolve('../dist/server/vue-ssr-server-bundle.json');
  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: require('fs').readFileSync(resolve('../public/index.html'), 'utf-8'),
    // 客服端清单
    // 为什么需要require，因为clientManifest加载json文件里面的内容
    clientManifest: require(resolve('../dist/client/vue-ssr-client-manifest.json'))
  });
  return renderer;
}

// 如果当前执行环境是开发环境，则监控src目录变化
if(isDev) {
  const cp = require('child_process');
  // 创建一个bs实例用于将来浏览器同步操作
  const bs = require('browser-sync').create();
  // 导入chokidar监控src
  const chokidar = require('chokidar');
  const watcher = chokidar.watch('src/**/*.*');
  watcher.on('change', (path) => {
    console.log(path + '发生变化，正在编译')
    // 开启子进程执行构建命令
    cp.exec('npm run build', function(error, stdout) {
      if(error) {
        console.log(error.stack)
        return 
      }
      // 构建信息输出到控制台
      console.log(stdout);
      console.log('构建完成');

      // 浏览器同步
      bs.reload();
    })
  })

  // 创建代理
  bs.init({proxy: 'http://localhost:9000'})
}

app.get('*', async (req, res) => {
  try {
    // 如果是开发模式或者还不存在renderer则创建
    if(isDev || !renderer) {
      renderer = createRenderer();
    }
    const context = {
      url: req.url
    };
    const html = await renderer.renderToString(context);
    // renderer.renderToString(context)
    // 将渲染html字符串返回给客服端
    res.send(html);

  } catch (error) {

  }


})

// 监听端口
app.listen(9000, () => {
  console.log('server start!');
})
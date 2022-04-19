#  本项目想要提供最简单的、比较全面的、易于上手的webhook服务
[git-webhook-handler](https://github.com/Rem486/git-webhook-handler) fork from https://github.com/Rem486/git-webhook-handler

#### 基于 nodejs 实现对 webhook 处理的，支持:

- [github](https://developer.github.com/webhooks/)

- [gitee](https://gitee.com/)

- [gitlab](https://gitlab.com/)

- [gitea](https://gitea.io/)

- [gogs](https://gogs.io/)

- [codeup](https://www.aliyun.com/product/yunxiao/codeup)

## Quickstart

#### 1、clone 项目

#### 2、初始化git submodule 子模块并且拉取git-webhook-handler.git代码

```
git submodule init
git submodule update
```

#### 3、安装node,以ubuntu为例

```
apt-get install node
npm install bl        // 安装bl
```

#### 4、修改项目下webhook.js文件

修改secret和端口，看情况修改path，

```
var http = require('http')
var createHandler = require('./git-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'xxx' }) # secret需要改

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";

  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(9096)   # 端口需要改

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
console.log('receive webhook success')
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
    run_cmd('sh', ['./webhook.sh',event.payload.repository.name], function(text){ console.log(text) });
})

handler.on('issues', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})

```

#### 5、修改自己需要的脚本,下面是示例，到一个目录下pull

```
#!/bin/bash

cd /root/model-manage
git pull
```

#### 6、在服务器内运行webhook.js

简单测试用，可以运行,记得确保**9096端口是外部可以访问的**

```
node webhook.js
```

实际使用，使用screen里面运行

```
apt-get install screen     //安装screen
screen -S webhook          //创建一个服务
screen -r webhook          //进入
node webhook.js            //运行服务
control+a+d       				//退出，千万不要control+c退出
```



#### 7、在网站上使用webhook服务（使用github作为例子）

github仓库->setting->web hooks,点击add webhook，端口是默认9096，**记得服务器开启9096端口，或者换其他可以通的端口**，secret记得和webhook.js里面一样。

![image-20220419225215304](/Users/jie/Library/Application Support/typora-user-images/image-20220419225215304.png)

点击测试webhook

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1ffkwn11gj21ee0jw3zn.jpg)

**成功！**

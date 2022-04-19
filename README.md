#  本项目想要提供最简单的、比较全面的、webhook服务
[git-webhook-handler](https://github.com/Rem486/git-webhook-handler) fork from https://github.com/Rem486/git-webhook-handler

#### 基于 nodejs 实现对 webhook 处理的，支持:

- [github](https://developer.github.com/webhooks/)

- [gitee](https://gitee.com/)

- [gitlab](https://gitlab.com/)

- [gitea](https://gitea.io/)

- [gogs](https://gogs.io/)

- [codeup](https://www.aliyun.com/product/yunxiao/codeup)

## Quickstart

1、clone 项目

2、初始化git submodule 子模块并且拉取git-webhook-handler.git代码

```
git submodule init
git submodule update
```

3、安装node,以ubuntu为例

```
apt-get install node
npm install bl        // 安装bl
```

4、修改webhook.js

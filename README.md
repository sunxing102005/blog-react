### 简介

#### 这是 React 搭建个人博客网站的一部分。网站分为两部分

-   博客前台页面
    ![在这里插入图片描述](http://cdn.sunx.club/blog-fontend-gif-sm.gif)
-   博客后台页面
    ![在这里插入图片描述](http://cdn.sunx.club/blog-backend-gif.gif)

#### 本项目是前台页面的前端部分。

#### 整个博客网站包含内容有

**_前端部分_**

-   [x] React
-   [x] React-Router4.0
-   [x] Redux
-   [x] AntDesign
-   [x] webpack4

**_后端部分_**

-   [x] consul+consul-template+nginx+docker 搭建微服务
-   [x] cdn 上传静态资源
-   [x] thinkJs

**_部署部分_**

-   [x] daocloud 自动化部署
-   [x] Prometheus+Grafana 监控系统

#### 想要详细了解博客的搭建过程与相关问题，可以查看

-   线上个人博客（即这个项目做出来的成果），[点这里](http://www.sunx.club/)
-   csdn 博客，[点这里](https://blog.csdn.net/qq_36228442)，查看 React 搭建博客系列。

### 服务启动

```
npm install
npm run start
```

本项目开发环境是使用 webpack 的 devserver，启动前端服务，访问后端接口
对应的后端项目 [点这里](https://github.com/sunxing102005/self-blog-fontend)。
启动本项目之前须先启动后端 self-blog-fontend 项目。

### 服务打包

-   项目打包生成路径，是本人计算机对的的服务端项目 self-blog-fontend 的 www 文件夹，view 文件夹，
    具体路径须根据自身两个项目的相对路径改写。
-   打包后，启动后端服务，访问http://localhost:8365，就能访问博客前台页面。

### 项目部署

本项目不直接参与线上部署，而是先打包到后端项目中，将后端制作为镜像，在服务器端生成容器。具体部署细节会在上述博客网站尽快更新。

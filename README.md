# README

## About

一个仿网易云音乐播放器，前端使用**vue**+**vite**+**elementUI**，后端使用**golang**+**wails**。
已实现功能：

- 播放器基本功能：播放/暂停、上一曲/下一曲、播放模式切换（单曲循环、列表循环、随机播放），音量调节
- 歌词实时同步显示
- 调整播放进度，倍速播放
- 收藏/取消收藏，限桌面客户端
- 复制音乐播放链接
- 下载歌曲
- 查看评论
- 歌曲、歌单、MV搜索
- MV在线播放
- 音乐榜单推荐

## 在线体验

http://netease.youthsweet.com/

## 桌面版

http://netease.youthsweet.com/

## 源码构建

安装环境

- nodejs、npm
- golang
- wails

构建打包

```shell
# 安装前端依赖 
npm install

# wails打包
wails build
```

## 预览

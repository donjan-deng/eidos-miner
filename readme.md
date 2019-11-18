# eidos空投矿机
虽然已经有几款网页版的了，但并不适合长期运行，特别是需要挂在VPS里，所以就出现了这款控制台运行的。

## 环境需求
 nodejs >= 10 
 scatter >= 11 (网页版可在低版本运行) 
## 使用方法
也有个简易的网页版打开即用:[https://donjan-deng.github.io/eidos-miner/](https://donjan-deng.github.io/eidos-miner/)
#### Linux
这个不说了，都懂的
#### Windows
安装nodejs,已有的跳过。
下载地址：[http://nodejs.cn/download/](http://nodejs.cn/download/)
选择“Windows 安装包”按你的系统下载32位或者64位，直接安装就行了。
下载源码：[https://github.com/donjan-deng/eidos-miner/archive/master.zip](https://github.com/donjan-deng/eidos-miner/archive/master.zip)
解压到一个英文目录，比如d:\eidos-miner
win+r打开运行，输入cmd，回车
然后

```bash
cd d:\eidos-miner 回车
d: 回车
npm install 回车
```
启动命令

```bash
npm start 
```

此时scatter会弹出link和transfer请求，同意并加入白名单就行。
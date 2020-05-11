## 技术栈 
  `react native` + `typescript` + `mobx` + `mst`

### 功能

- [x] 点击翻页
- [x] 滑动翻页
- [x] 双向列表
- [x] 收藏书籍
- [ ] 导入本地书籍

### 平台

- [x] ios
- [ ] Android

[![ios 端演示]](https://qiniu.tuscanyyy.top/novel-app-ios.gif)

### 目录结构

  `pages` - 页面和页面自有组件，`components` - 公用组件，`stores` - 存放 `state`
  `hooks` - 封装公用的 `hook` 函数，`services` - 网络请求的 `api`，`utils` - 存放工具和帮助的函数

### 敏捷开发
  `vscode` 下使用 `typescript` 有良好的开发体验，添加 `snippet` 代码片段对通用的结构代码帮助很大，比如 `sfc` (无状态组件) 
  和 `fc` 状态组件，快速地打印 `console.log` 加快 `debug` 的速度，在文件夹的目录下定义 `index.ts` 导出里面文件，方便其他
  文件引用的时候不用找那么深，尽量使用 `export const ...` 代替 `export default ...`，可以配合 `export * from ...` 导出
  全部

### 使用 `typescript`
  添加 `tsconfig.json`，设定默认规则，将原本的 `js` 组件文件全改成 `tsx` 结尾的文件，如果不是组件可以改成以 `ts` 结尾，
  注意定义 `props` 的参数类型，一般是组件。

### 使用 `hook`
  注意 `useEffect` 在初始化会执行一次，如果有参数，在参数的变化也会执行，相当于以前的 `componentDidMount` 和 `componentWillUpdate` 结合
  在里面返回一个函数可以相当于 `componentWillUnMount`
  封装 `hook` 可以带来很大的便利，比如 `hooks` 文件夹下的 `useService`，只需要在要进行网络请求的地方使用，传递相应的参数便能获得结果，`loading`
  的状态和 `sumbit` 的状态，以及错误的捕捉都可以被封装

### 状态管理
  添加 `mobx` 和 `mobx-react`，添加 `mst` 以用来配合 `reactotron` 桌面软件的使用，使用了 `typescript` 后 `mst` 显得不是很有帮助，但是为了
  使用上 `reactotron` 观测 `state` 变化是很值得的。记得在所有页面和组件添加 `observer` 以用于使其观测得到 `state` 的变化，尽量把所有 `state`
  存放在 `store` 里面，像是数据库般使用它。配合 `hook` 的 `createContext` 和 `usContext` 可以很方便地使用 `store`。 

### 观测 `state` 
  下载 `reactotron` 桌面软件 ( https://github.com/infinitered/reactotron )，按照教程下载和安装，在项目安装 `reactotron-react-native`
  和 `reactotron-mst` 插件，添加 `RactotronConfig.js`，官网都写的很清楚。
  需要特别注意的是 `import ReactotronConfig.js` 后才可以使用 `trackMstNode`函数
  ```
  if (__DEV__) {
    import('./ReactotronConfig')
      .then(() => {
        Reactotron.trackMstNode!(stores)
      })
  }
  ```

### 观测网络请求
  `utils` 文件夹下的 `request` 和 `logger.debug` 函数打印在控制台，下载 `react-native-debugger` 配合更好


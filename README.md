## 技术栈 
  `react native` + `typescript` + `mobx` + `mst`

### 主要实现的功能
  小说阅读器，实现滑动翻页和点击翻页，双向滚动列表

### 项目的目录结构 （ `src` ）
  `pages` - 页面和页面自有组件，`components` - 公用组件，`stores` - 存放 `state`
  `hooks` - 封装公用的 `hook` 函数，`services` - 网络请求的 `api`，`utils` - 存放工具和帮助的函数

### 使用 `typescript`
  添加 `tsconfig.json`，设定默认规则，将原本的 `js` 组件文件全改成 `tsx` 结尾的文件，如果不是组件可以改成以 `ts` 结尾，
  注意定义 `props` 的参数类型，一般是组件，

### 使用最新的 `hook`
  注意 `useEffect` 在初始化会执行一次，如果有参数，在参数的变化也会执行，相当于以前的 `componentDidMount` 和 `componentWillUpdate` 结合
  在里面返回一个函数可以相当于 `componentWillUnMount`
  封装 `hook` 可以带来很大的便利，比如 `hooks` 文件夹下的 `useService`，只需要在要进行网络请求的地方使用，传递相应的参数便能获得结果，`loading`
  的状态和 `sumbit` 的状态，以及错误的捕捉都可以被封装

### 全局状态管理
  `mobx` + `mobx-react` + `mst`

### 观测 `state` 变化 
  下载 `reactotron` ( https://github.com/infinitered/reactotron )，按照教程下载和安装

### 观测网络请求
  `utils` 文件夹下的 `request` 和 `logger.debug` 函数打印在控制台，下载 `react-native-debugger` 配合更好


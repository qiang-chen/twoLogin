import dva from "dva";
import App from "./App"
import { createModel } from '@/store';


//注意这种引入方式已经报销  在控制台会报警告
// import createHistory from 'history/createBrowserHistory';

//这种为history路由展示方式
//const createHistory=require("history").createBrowserHistory

//这种为hash路由展示方式
const createHistory=require("history").createHashHistory

//下面是两种注入方式
const app = dva({
  history: createHistory(),
});

//const app=dva(createHistory);

//展示仓库
// app.model(require("@/store/user.js").default)
createModel(app)


app.router(App)

app.start('#root');
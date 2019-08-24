import dva from 'dva';
import './index.css';

// const createHistory=require("history").createBrowserHistory;
// const app = dva({
//   history: createHistory(),
// });

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./store/user.js').default);

app.model(require("./store/list.js").default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

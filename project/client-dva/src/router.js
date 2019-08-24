import React,{Suspense} from 'react';
import { Router } from 'dva/router';

import RouteView from "./routes/RouteView"
import RouteConfig from "./routes/RouteConfig"

function App({ history }) {
  return (
    <Router history={history}>
      <Suspense fallback={<div>loading...</div>}>
          <RouteView children={RouteConfig}></RouteView>
      </Suspense>
    </Router>
  );
}

export default App;

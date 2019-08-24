import React,{Suspense} from 'react'

import {Router} from "dva/router"

import RouteView from "./routes/RouteView"
import RouteConfig from "./routes/RouteConfig"

//注意这里一定要注入history不然页面展示不出来  而且是结构出来的history
function App({history}){
    return <Router history={history}>
        <Suspense fallback={<div>loading...</div>}>
        <RouteView children={RouteConfig}></RouteView>
        </Suspense>
        
    </Router>
}

export default App

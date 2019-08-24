/*
 * @Author: chenqiang 
 * @Date: 2019-08-16 10:59:42 
 * @Last Modified by: chenqiang
 * @Last Modified time: 2019-08-17 20:19:41
 * 路由配置表
 */
import React from "react";
const RouteConfig=[
    {
        path:"/main",
        component:React.lazy(()=>import("@/views/main/index.jsx")),
        children:[
           {
               path:"/main/home",
               component:React.lazy(()=>import("@/views/main/home/index.jsx"))
           },{
               path:"/main",
               redirect: "/main/home"
           }
        ]
    }, {
        path:"/login",
        component:React.lazy(()=>import("@/views/login/index.jsx"))
    },{
        path:"/register",
       component:React.lazy(()=>import("@/views/register/index.jsx"))
    },{
        path:"/",
        redirect:"/main"
    }
]

export default RouteConfig;
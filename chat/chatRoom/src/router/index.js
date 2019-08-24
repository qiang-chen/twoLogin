import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


const router=new Router({
  linkActiveClass:"active",
  //mode:"history",
  routes: [
    {
      path:"/",
      redirect:"/home"
    },
    {
      path: '/main',
      name: 'Main',
      component:()=>import("@/views/main"),
      children:[
        {
          path:"/main/list",
          name:"List",
          component:()=>import("@/views/main/list")
        },{
          path:"/main/chat",
          name:"Chat",
          component:()=>import("@/views/main/chat")
        },{
          path:"/main/my",
          name:"My",
          component:()=>import("@/views/main/my")
        },{
          path:"/main",
          redirect:"/main/list"
        }
      ]
    },{
      path:"/home",
      component:()=>import("@/views/home/")
    },{
      path:'/login',
      component:()=>import("@/views/login/")
    },{
      path:"/register",
      component:()=>import("@/views/register/")
    },{
      path:"/find",
      component:()=>import("@/views/find/")
    },{
      path:"/exitPass/:id",
      component:()=>import("@/views/exitPass/")
    }
  ]
})


export default router;

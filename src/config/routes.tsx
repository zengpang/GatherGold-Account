import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { Forth } from "../components/welcome/Forth";
import { Second } from "../components/welcome/Second";
import { Third } from "../components/welcome/Third";
import { StartPage } from "../views/StartPage";
import { Welcome } from "../views/Welcome";
import { MainPage } from "../views/MainPage";
import { ItemList } from "../shared/ItemList";
import { ItemCreate } from "../components/item/ItemCreate";
import { ItemPage } from "../views/ItemPage";
import { TagPage } from "../views/TagPage";
import { TagCreate } from "../components/tag/TagCreate";
import { TagEdit } from "../components/tag/TagEdit";
import { HomePage } from "../components/main/HomePage";
import { StatisticsPage } from "../components/main/StatisticsPage";
import { LoginPage } from "../components/main/LoginPage";
import { TagInput } from "../components/tag/TagInput";

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },

  {
    path: '/welcome',
    component: Welcome,
    beforeEnter:(to,from,next)=>{
      //获取skipFeatures键值对的值，如果为yes则判断用户看过或跳过引导页，则直接前往首页
      localStorage.getItem('skipFeatures') === 'yes' ? next('/start') : next();
    },
    //子页
    children: [
      { path: '', redirect: '/welcome/1' },
      { path: '1', name: "Welcome1", component: First },
      { path: '2', name: "Welcome2", component: Second },
      { path: '3', name: "Welcome3", component: Third },
      { path: '4', name: "Welcome4", component: Forth },
    ]
  },
  { path: '/start', component: StartPage },
  {
    path: '/main', component: MainPage,
    children:[
      { path: '/main', redirect: '/main/home' },
      {path:'home',name:"HomePage",component:HomePage},
      {path:'statistics',name:"StatisticsPage",component:StatisticsPage},
      {path:'login',name:"LoginPage",component:LoginPage}
    ]

  },
  {
    path: '/items', component: ItemPage,
    children: [
      { path: '', component: ItemList },
      { path: 'create', component: ItemCreate }
    ]
  },
  {
    path: '/tags', component: TagPage,
    children: [
      { path: 'create', component: TagCreate },
      { path: ':id/edit', component: TagEdit },
      { path: ':id/input',component:TagInput}

    ]

  }

]
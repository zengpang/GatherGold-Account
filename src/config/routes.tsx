import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { Forth } from "../components/welcome/Forth";
import { Second } from "../components/welcome/Second";
import { Third } from "../components/welcome/Third";
import { StartPage } from "../views/StartPage";
import { Welcome } from "../views/Welcome";
import { MainPage } from "../views/MainPage";
import { ItemList } from "../components/item/ItemList";
import { ItemCreate } from "../components/item/ItemCreate";
import { ItemPage } from "../views/ItemPage";
import { TagPage } from "../views/TagPage";
import { TagCreate } from "../components/tag/TagCreate";
import { TagEdit } from "../components/tag/TagEdit";
export const routes:RouteRecordRaw[]=[
    {path:'/',redirect:'/welcome'},
    
    {
      path:'/welcome',
      component:Welcome,
      //子页
      children:[
        {path:'',redirect:'/welcome/1'},
        {path:'1', name: "Welcome1",component:First},
        {path:'2', name: "Welcome2",component:Second},
        {path:'3', name: "Welcome3",component:Third},
        {path:'4', name: "Welcome4",component:Forth},
      ]
    },
    {path:'/start',component:StartPage},
    {
      path:'/main',component:MainPage
      
    },
    {
       path:'/items',component:ItemPage,
       children:[
        {path:'',component:ItemList},
        {path:'create',component:ItemCreate}
       ]
    },
    {
      path:'/tags',component:TagPage,
      children:[
        {path:'create',component:TagCreate},
        {path:':id/edit',component:TagEdit}

      ]

    }
   
]
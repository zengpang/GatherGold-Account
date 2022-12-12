import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { Forth } from "../components/welcome/Forth";
import { Second } from "../components/welcome/Second";
import { Third } from "../components/welcome/Third";
import { StartPage } from "../views/StartPage";
import { Welcome } from "../views/Welcome";
export const routes:RouteRecordRaw[]=[
    {path:'/',redirect:'/welcome'},
    
    {
      path:'/welcome',
      component:Welcome,
      children:[
        {path:'',redirect:'/welcome/1'},
        {path:'1', name: "Welcome1",component:First},
        {path:'2', name: "Welcome2",component:Second},
        {path:'3', name: "Welcome3",component:Third},
        {path:'4', name: "Welcome4",component:Forth},
      ]
    },
    {path:'/start',component:StartPage}
   
]
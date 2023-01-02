import {routes} from './config/routes';
import { createApp } from 'vue'
import {App} from './App.js'
import {createRouter} from 'vue-router';
import {history} from './shared/history';

import { fetchMe, mePromise } from './shared/me';
const router=createRouter({history,routes});
fetchMe();
//路径白名单
const whiteList:Record<string,'exact'|'startsWith'>={
    '/':'exact',
    '/start':'exact',
    '/welcome':'startsWith',
    '/main/login':'startsWith'
}
// router.beforeEach((to, from) => {
//     for (const key in whiteList) {
//       const value = whiteList[key]
//       if (value === 'exact' && to.path === key) {
//         return true
//       }
//       if (value === 'startsWith' && to.path.startsWith(key)) {
//         return true
//       }
//     }
//     return mePromise!.then(
//         ()=>true,
//         () => '/main/login?return_to=' + to.path
//     )
// })
const app=createApp(App);
app.use(router);
app.mount('#app');


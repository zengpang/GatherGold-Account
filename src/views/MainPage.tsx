import { defineComponent,ref } from 'vue'
import { RouterView } from 'vue-router'
import { BottomBar } from '../shared/BottomBar'
import { TabPageBar } from '../shared/TabPageBar'
import s from './MainPage.module.scss'

export const MainPage=defineComponent({
    setup:(props,context)=>{
        const refKind = ref('home')
        return ()=>(
            <div class={s.wrapper}>
                 <TabPageBar></TabPageBar>
                 <h1>主页</h1>
                 <BottomBar v-model:selectName={refKind.value}></BottomBar>
            </div>
           
        )
    }
})
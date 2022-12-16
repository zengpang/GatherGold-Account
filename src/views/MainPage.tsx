import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { BottomBar } from '../shared/BottomBar'
import s from './MainPage.module.scss'

export const MainPage=defineComponent({
    setup:(props,context)=>{
        return ()=>(
            <div class={s.wrapper}>
                 <h1>主页</h1>
                 <BottomBar></BottomBar>
            </div>
           
        )
    }
})
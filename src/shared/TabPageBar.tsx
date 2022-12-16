import s from './TabPageBar.module.scss';
import { defineComponent } from "vue";
//分页导航栏
export const TabPageBar=defineComponent({
    setup:(props,context)=>{
        return ()=>(
            <div class={s.tabPageBar}>
                 分页导航栏
            </div>
        )
    }
})
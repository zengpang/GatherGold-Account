import s from './BottomBar.module.scss';
import { defineComponent } from "vue";
import { TextIcon } from './TextIcon';
// 底部导航栏组件
export const BottomBar=defineComponent({
    setup:(props,context)=>{
        return ()=>(
            <div class={s.bottomBar}>
                 <TextIcon></TextIcon>
            </div>
        )
    }
})
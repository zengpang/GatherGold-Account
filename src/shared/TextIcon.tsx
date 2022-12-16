import s from './TextIcon.module.scss';
import { defineComponent } from "vue";
//文本图标
export const TextIcon = defineComponent({
    setup:()=>{
        return ()=>(
            <a class={s.TextIcon}>
                 &#xe639;
            </a>
        )
    }
})
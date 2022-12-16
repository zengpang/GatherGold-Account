import s from './BottomBar.module.scss';
import { defineComponent } from "vue";
import { TextIcon,TextIconNames } from './TextIcon';
// 底部导航栏组件
export const BottomBar=defineComponent({
    setup:(props,context)=>{
        const iconBtns=['home','chart','add','export','user'];

        return ()=>(
            <div class={s.bottomBar}>
                {
                   iconBtns.map(item=>{
                    return (<TextIcon  class={s.icon} textIconName={item as TextIconNames}></TextIcon>)
                   }) 
                }
                 
            </div>
        )
    }
})
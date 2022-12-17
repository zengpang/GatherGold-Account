import s from './TextIcon.module.scss';
import { defineComponent, mergeProps, PropType } from "vue";
const textIcons = {
    'home': s.home,
    'chart': s.chart,
    'user': s.user,
    'add': s.add,
    'export':s.export
}

export type TextIconNames='home'|'chart'|'user'|'add'|'export';
//文本图标
export const TextIcon = defineComponent({
    props:{
      textIconName:{
        type:String as PropType<TextIconNames>,
        default: 'chart'
      },
      onClick:{
        type:Function as PropType<(e:MouseEvent)=>void>
      }  
    },
    
    setup:(props,context)=>{
       
        const iconName=textIcons[props.textIconName];
         
        return ()=>(
            <a class={[s.TextIcon,iconName]} onClick={(props.onClick)} >
            </a>
        )
    }
})
import s from './TagItem.module.scss';
import { defineComponent, PropType } from 'vue';
export const TagItem = defineComponent({
    props: {
        tagNumber: {
            type: Number as PropType<number>,
            required: false
        },
        tagName: {
            type: String as PropType<string>,
            required: true
        },
        tagIcon:{
            type: String as PropType<string>,
            required: true
        }
        ,
        onClick:{
            type:Function as PropType<(e:MouseEvent)=>void>
        },
        onTouchstart:{
            type:Function as PropType<(e:TouchEvent)=>void>
        },
        onTouchend:{
            type:Function as PropType<(e:TouchEvent)=>void>
        }
       
    },
    setup: (props, context) => {
        return () => (<div class={s.tagItem} onTouchstart={props.onTouchstart} onTouchend={props.onTouchend}  onClick={props.onClick}>
             <div class={s.header}><div class={s.icon}>{props.tagIcon}</div><a class={s.headTitle}>{props.tagNumber}</a></div>
             <a class={s.content}>{props.tagName}</a>
             <a class={s.footer}></a>    
            </div>);
    }
})
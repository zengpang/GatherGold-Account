import s from './TagItem.module.scss';
import { defineComponent, PropType } from 'vue';
export const TagItem = defineComponent({
    props: {
        tagNumber: {
            type: Number as PropType<number>,
            required: true
        },
        tagName: {
            type: String as PropType<string>,
            required: true
        },
        tagIcon:{
            type: String as PropType<string>,
            required: true
        }
        
       
    },
    setup: (props, context) => {
        return () => (<div class={s.tagItem}>
             <div class={s.header}><div class={s.icon}>{props.tagIcon}</div><a class={s.headTitle}>{props.tagNumber}</a></div>
             <a class={s.content}>{props.tagName}</a>
             <a class={s.footer}></a>    
            </div>);
    }
})
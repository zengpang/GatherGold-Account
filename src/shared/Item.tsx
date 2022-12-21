import s from './Item.module.scss';
import { defineComponent, PropType } from 'vue';
export const Item = defineComponent({
    props: {
        tagNumber: {
            type: Number as PropType<number>,
            required: true
        },
        tagName: {
            type: String as PropType<string>,
            required: true
        },
        tagcategory:{
            type: String as PropType<string>,
            required: true
        },
        tagPrice:{
            type: Number as PropType<number>,
            required: false,
            default:0
        },
        tagIcon:{
            type: String as PropType<string>,
            required: true
        },
        isShowPrice:{
            type:Boolean as PropType<boolean>,
            default:false
        }
       
    },
    setup: (props, context) => {
        return () => (<div class={s.item}>
            <div class={s.header}><div class={s.icon}>{props.tagIcon}</div><a class={s.headTitle}>{props.tagNumber}</a></div>
            <a class={s.content}>{props.tagName}</a>
            <a class={s.footer}>{props.isShowPrice?props.tagPrice:''}</a>
            
            </div>);
    }
})
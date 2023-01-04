import s from './Item.module.scss';
import { defineComponent, PropType } from 'vue';
export const Item = defineComponent({
    props: {
      
        tagName: {
            type: String as PropType<string>,
            required: true
        },
        tagIcon: {
            type: String as PropType<string>,
            required: true
        },
        tagTime: {
            type: String as PropType<string>,
            required: true
        },
        tagPrice: {
            type: Number as PropType<number>,
            required: true
        }

    },
    setup: (props, context) => {
        return () => {
            const isincome=props.tagPrice>0;
            return <div class={s.item }  >
                <div class={s.sign}>
                    <span>{props.tagIcon}</span>
                </div>
                <div class={s.text}>
                    <div class={s.tagAndTime}>
                        <span class={s.tag}>{props.tagName}</span>
                        <span class={s.time}>
                           {props.tagTime}
                         </span>
                        
                    </div>
                    <div class={s.price}>
                    {/* (isincome?"+￥":"-￥")+ */}
                       <span class={[s.amount,isincome?s.income:'']}>{(isincome?"+￥":"-￥")+props.tagPrice}</span>
                    </div>
                </div>
            </div>
        }
            ;
    }
})
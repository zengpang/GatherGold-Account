import { defineComponent, PropType, ref } from 'vue';

import { Time } from '../../shared/time';
import s from './InputPad.module.scss';
import { DatetimePicker, NumberKeyboard, Popup } from 'vant';
export const InputPad=defineComponent({
    props: {
        name: {
          type: String as PropType<string>
        }
      },
    setup:(props,context)=>{
        return()=>(
           <h1>数字输入</h1>
        )
    }
})
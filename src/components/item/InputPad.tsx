import { defineComponent, PropType, ref } from 'vue';

import { Time } from '../../shared/time';
import s from './InputPad.module.scss';
import { DatetimePicker, NumberKeyboard, Popup } from 'vant';
import { TextIcon } from '../../shared/TextIcon';
import { Button } from '../../shared/Button';

export const InputPad = defineComponent({
  props: {
    //class使用
    name: {
      type: String as PropType<string>
    },
    happenAt:String,
    amount:Number,
    //提交事件
    onSubmit:{
      type:Function as PropType<()=>void>
    }

  },
  setup: (props, context) => {
    const now = new Date();
    const refAmount = ref('0')
    const refDate = ref<Date>(now);
    const appendText = (n: number | string) => {
      const nString = n.toString();
      const dotIndex = refAmount.value.indexOf('.')
      if (refAmount.value.length >= 13) {
        return;
      }
      if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) {
        return;
      }
      if (nString === '.') {
        if (dotIndex >= 0) //已经有小数点
        {
          return;
        }
      }
      else if (nString === '0') {
        if (dotIndex === -1) //没有小数点
        {
          if (refAmount.value === '0') {
            return;
          }
        }
      }
      else {
        if (refAmount.value === '0') {
          refAmount.value = '';
        }
      }
      refAmount.value += n.toString();
    }
    const buttons = [
      { text: '1', onClick: () => { appendText(1) } },
      { text: '2', onClick: () => { appendText(2) } },
      { text: '3', onClick: () => { appendText(3) } },
      { text: '4', onClick: () => { appendText(4) } },
      { text: '5', onClick: () => { appendText(5) } },
      { text: '6', onClick: () => { appendText(6) } },
      { text: '7', onClick: () => { appendText(7) } },
      { text: '8', onClick: () => { appendText(8) } },
      { text: '9', onClick: () => { appendText(9) } },
      { text: '.', onClick: () => { appendText('.') } },
      { text: '0', onClick: () => { appendText(0) } },
      { text: '清空', onClick: () => { refAmount.value = '0' } },
      // { text: '提交', onClick: () => { } },
    ]
    const refDatePickerVisible = ref(false);
    const showDatePicker = () => refDatePickerVisible.value = true;
    const hideDatePicker = () => refDatePickerVisible.value = false;
    const setDate = (date: Date) => { refDate.value = date; hideDatePicker() };
    const submitClick=()=>{
      context.emit('update:amount',parseFloat(refAmount.value)*100);
      props.onSubmit?.();
    }
    return () => (
      <div>

        <div class={s.dateAndAmount}>
          <span class={s.money}>￥<span class={s.amount}>{refAmount.value}</span></span>
          <span class={s.date}>
            <TextIcon textIconName="date" class={s.icon} />
            <span>
              <span onClick={showDatePicker} class={s.dateContent}>{new Time(props.happenAt).format()}</span>
              <Popup position='bottom' v-model:show={refDatePickerVisible.value}>
                <DatetimePicker value={refDate.value} type="date" title="选择年月日"
                  onConfirm={setDate} onCancel={hideDatePicker}
                />
              </Popup>
            </span>
          </span>
          {/* <span class={s.amount}>{refAmount.value}</span> */}
        </div>
        <div class={s.buttons}>
          {buttons.map(button =>
            <button onClick={button.onClick}><div class={[s.btnbg]}>{button.text} </div></button>
          )}
          <Button onClick={submitClick}>提交</Button>
        </div>

      </div>
    )
  }
})
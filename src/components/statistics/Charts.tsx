import { defineComponent, PropType, ref } from 'vue';
import { FormItem } from '../../shared/Form';
import s from './Charts.module.scss';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { Bars } from './Bars';

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true
    },
    endDate: {
      type: String as PropType<string>,
      required: true
    },
    itemTitle: {
      type: String as PropType<string>,
      required: false,
      defulat:""
    },
    // items: {
    //   type: Array as PropType<Array<any>>,
    //   required: true
    // }
  },
  setup: (props, context) => {
    const category = ref('expenses')
    return () => (
      <div class={s.wrapper}>
        <FormItem label='类型' type="select" options={[
          { value: 'expenses', text: '支出' },
          { value: 'income', text: '收入' }
        ]} v-model={category.value} class={s.chartSelect} />
        <LineChart />
        <PieChart />
        <Bars />
      </div>
    )
  }
})
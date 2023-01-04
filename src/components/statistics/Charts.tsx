import { defineComponent, PropType, ref,computed } from 'vue';
import { FormItem } from '../../shared/Form';
import s from './Charts.module.scss';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { Bars } from './Bars';
import { Time } from '../../shared/time';

const DAY=24*3600*1000;
type Data1Item={happen_at:string;amount:number};
type Data1=Data1Item[];
type Data2Item={tag_id:number;Tag:Tag;amount:number};
type Data2=Data2Item[];
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
    const category = ref('expenses');
    const data1=ref<Data1>([]);
    const betterData1=computed<[string,number][]>(()=>{
      if(!props.startDate||!props.endDate)
      {
        return [];
      }
      const diff=new Date(props.endDate).getTime()-new Date(props.startDate).getTime();
      const n=diff/DAY+1;
      return Array.from({length:n}).map((_,i)=>{
        const time=new Time(props.startDate+'T00:00:00.000+0800').add(i,'day').getTimestamp();
        const item=data1.value[0];
        const amount=item&&new Date(item.happen_at).getTime()=== time?data1.value.shift()!.amount:0;
        
      })
    })
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
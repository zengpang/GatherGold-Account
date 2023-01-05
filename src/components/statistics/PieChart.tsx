import { defineComponent, onMounted, PropType, ref } from 'vue';
import s from './PieChart.module.scss';
import * as echarts from 'echarts';
import { getMoney } from '../../shared/Money';
const defaultOption={
  tooltip:{
    trigger:'item',
    formatter:(x:{name:string,value:number,percent: number})=>{
        const {name,value,percent}=x;
        return `${name}:￥${getMoney(value)} 占比 ${percent}%`;
    }
  },
  grid:[
    { left: 0, top: 0, right: 0, bottom: 0 }
  ],
  series:[
    {
      type:'pie',
      radius:'70%',
      emphasis:{
        
      }
    }
  ]
}
export const PieChart = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    },
    data: {
      type: Array as PropType<{name:string, value: number}[]>
    }
  },
  setup: (props, context) => {
    const refDiv2 = ref<HTMLDivElement>()
    onMounted(() => {
      if (refDiv2.value === undefined) { return }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(refDiv2.value);
      // 绘制图表
      const option = {
        grid: [
          { left: 0, top: 0, right: 0, bottom: 20 }
        ],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    })
    return () => (
      <div ref={refDiv2} class={s.wrapper}></div>
    )
  }
})
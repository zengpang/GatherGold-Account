import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import s from './LineChart.module.scss';
import * as echarts from 'echarts';
import { Time } from '../../shared/time';
import { Value } from 'sass';
const echartsOption={
  tooltip:{
    show:true,
    trigger: 'axis',
    formatter:([item]:any)=>{
      const [x,y]=item.data;
      return `${new Time(new Date(x)).format('YYYY年MM月DD日')}`
    }
  },
  grid:[{lert:16,top:20,right:16,bottom:20}],
  xAxis:{
    type:'time',
    boundaryGap:['3%','0%'],
    axisLabel:{
      formatter:(Value:string)=>new Time(new Date(Value)).format('MM-DD'),
    },
    axisTick:{
      alignWithLabel:true
    }
  },
  yAxis:{
    show:true,
    type:'value',
    splitLine:{
      show:true,
      lineStyle:{
        type:'dashed'
      },
    },
    axisLabel:{
      show:false,
    },
  },
}
export const LineChart = defineComponent({
  props:{
    data:{
      type:Array as PropType<[string,number][]>,
      required: true,
    },
  },
  setup: (props, context) => {
    const refDiv = ref<HTMLDivElement>();
    let chart:echarts.ECharts|undefined=undefined;
    onMounted(() => {
      if (refDiv.value === undefined) { return }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(refDiv.value);
      // 绘制图表
      myChart.setOption({
       ...echartsOption,
       series:[
        {
          data:props.data,
          type:'line'
        }
       ]
      });

    })
    watch(
      ()=>props.data,
      ()=>{
        chart?.setOption({
          series: [
            {
              data: props.data,
            },
          ],
        })
      }
    )
    return () => <div ref={refDiv} class={s.wrapper}></div>
  }
})
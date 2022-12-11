import { computed, onMounted, onUnmounted, ref, Ref } from "vue";
type Point={
    x:number;
    y:number;
}
//接口
interface Options{
   beforeStart?:(e:TouchEvent)=>void
   afterStart?: (e: TouchEvent) => void
   beforeMove?: (e: TouchEvent) => void
   afterMove?: (e: TouchEvent) => void
   beforeEnd?: (e: TouchEvent) => void
   afterEnd?: (e: TouchEvent) => void
}
export const useSwipe=(element:Ref<HTMLElement|undefined>,options?:Options)=>{
    //起始点击位置
    const start=ref<Point>();
    //最终离开位置
    const end=ref<Point>();
    //判断是否滑动
    const swiping=ref(false);
    //滑动距离
    const distance=computed(()=>{
        //判断起始位置或者终止位置是否为空，如果为空则返回null
        if(!start.value||!end.value){return null}
        //计算滑动距离
        return {
           x:end.value.x-start.value.x,
           y:end.value.y-start.value.y 
        }
    });
    //方向判断
    const direction=computed(()=>{
        if(!distance.value){return ''};
        const {x,y}=distance.value;
        //判断x轴的移动值是否大于y轴的移动值
        if(Math.abs(x)>Math.abs(y))
        {
            //如果是则判断移动方向为x轴
            //然后判断x轴方向
            return x>0?'right':'left';
        }
        else
        {
          //如果否则判断移动方向为y轴
          return y>0?'down':'up';
        }
    });
    //初始点击事件
    const onStart=(e:TouchEvent)=>{
       options?.beforeStart?.(e);
       swiping.value=true;

    }
    //移动事件
    const onMove=(e:TouchEvent)=>{
      options?.beforeMove?.(e);
      
    }
    //移动结束事件
    const onEnd=(e:TouchEvent)=>{
        options?.beforeEnd?.(e);
        swiping.value=false;
        options?.afterEnd?.(e);
    }
    //生命周期onMounted挂载所有事件
    onMounted(()=>{
  
    })
    //生命周期onUnmounted卸载所有事件
    onUnmounted(()=>{

    })
}
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
    console.log("执行");
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
    //触碰白名单
    const excludeTouch=(event:TouchEvent)=>{
        const path = (event.composedPath && event.composedPath());
    
        if((path[0] as HTMLElement).innerHTML=="下 一 页")
        {
          return true;
        }
       
        return false;
    };
    //初始点击事件绑定函数
    const onStart=(e:TouchEvent)=>{
       
       if(excludeTouch(e)){return};
       options?.beforeStart?.(e);
       //初次点击更改滑动状态为true
       swiping.value=true;
       //获取点击位置的XY坐标
       end.value=start.value={x:e.touches[0].screenX,y:e.touches[0].screenY};
       options?.afterStart?.(e);
    }
    //移动事件处理绑定函数
    const onMove=(e:TouchEvent)=>{
      options?.beforeMove?.(e);
      if(!start.value){return};
      //获取点击位置的XY坐标
      end.value={x:e.touches[0].screenX,y:e.touches[0].screenY};
      options?.afterStart?.(e);
    }
    //移动结束事件绑定函数
    const onEnd=(e:TouchEvent)=>{
        options?.beforeEnd?.(e);
        //初次点击更改滑动状态为false
        swiping.value=false;
        options?.afterEnd?.(e);
    }
    //生命周期onMounted挂载所有事件绑定函数
    onMounted(()=>{
    
       if(!element.value){return}
       //touchstart事件绑定onStart函数
       element.value.addEventListener('touchstart',onStart);
       //touchmove事件绑定onMove函数
       element.value.addEventListener('touchmove',onMove);
       //touchend事件绑定onEnd函数
       element.value.addEventListener('touchend', onEnd); 
    })
    //生命周期onUnmounted卸载所有事件
    onUnmounted(()=>{
        if (!element.value) { return }
        //卸载touchstart事件上绑定的onStart函数
        element.value.removeEventListener('touchstart', onStart)
        //卸载touchmove事件上绑定的onMove函数
        element.value.removeEventListener('touchmove', onMove)
        //卸载touchend事件上绑定的onEnd函数
        element.value.removeEventListener('touchend', onEnd)
    })
    return {
        swiping,
        direction,
        distance
    }
    
}
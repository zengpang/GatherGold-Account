//加载文件
export enum LoadTypes{
    loadGif=1
    
}
import lottie from 'lottie-web';
import {computed, onMounted,onUnmounted, ref, Ref } from "vue";
//element:Ref<HTMLElement|undefined>
export const useLoad=(element: Ref<HTMLElement | undefined>,loadTypes?:LoadTypes,fileInfo?:any)=>{
  //加载gif
  const loadGif=()=>{
    lottie.loadAnimation({//初始化
        container: element.value as Element,//获取节点
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: fileInfo,
    });
  };
  onMounted(()=>{
    console.log("开始加载");
    switch(loadTypes)
    {
      case 1:{
        loadGif();
      };break;
    }
  })
}
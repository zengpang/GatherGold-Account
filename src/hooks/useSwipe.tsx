import { computed, onMounted, onUnmounted, ref, Ref } from "vue";
type Point={
    x:number;
    y:number;
}
interface Options{
   beforeStart?:(e:TouchEvent)=>void
   afterStart?: (e: TouchEvent) => void
   beforeMove?: (e: TouchEvent) => void
   afterMove?: (e: TouchEvent) => void
   beforeEnd?: (e: TouchEvent) => void
   afterEnd?: (e: TouchEvent) => void
}
export const useSwipe=(element:Ref<HTMLElement|undefined>,options?:Options)=>{
    
}
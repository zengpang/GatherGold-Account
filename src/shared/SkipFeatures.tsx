import { defineComponent,PropType } from "vue";
import { RouteLocationRaw,RouterLink } from "vue-router";
//跳过组件
export const SkipFeatures=defineComponent({
    setup:(props,context)=>{
        const onClick=()=>{
            //点击之后，存储一个键为skipFeatures的键值对，该键值对表示用户是否看完或者跳过引导页
            localStorage.setItem('skipFeatures', 'yes');
        }
        return ()=>(
            <span onClick={onClick}>
               <RouterLink to="/start">跳过</RouterLink>
            </span>
        )
    }
})
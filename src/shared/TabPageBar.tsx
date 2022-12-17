import s from './TabPageBar.module.scss';
import { defineComponent } from "vue";
//分页导航栏
export const TabPageBar = defineComponent({
    setup: (props, context) => {
        return () => {
            const tabs=context.slots.default?.();
            if(!tabs) return ()=>null;
            for(let i=0;i<tabs.length;i++)
            {
                if(tabs[i].type!==TabPage)
                {
                    
                }
            }
            return <div class={s.tabPageBar}>
                分页导航栏
            </div>
        }


    }
})
export const TabPage = defineComponent({
    setup: (props, context) => {
        return () => (
            <div>
              {context.slots.default?.()}
            </div>
        )
    }
})
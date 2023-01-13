import { defineComponent,PropType } from "vue";
import s from './NavBar.module.scss'
export const NavBar=defineComponent({
    props:{
       name:{
        type: String as PropType<string>,
        required: false
       }
    },
    setup:(props,context)=>{
        const{slots}=context;
        
        return ()=>(
            <div class={s.navbar}>
               <span class={s.icon}>{slots.icon?.()}</span>
               <span class={s.title}>{slots.title?.()}</span>
            </div>
        )
    }
})
import s from './BottomBar.module.scss';
import { defineComponent,PropType,ref } from "vue";
import { TextIcon,TextIconNames } from './TextIcon';
import {RouterLink} from 'vue-router';
// 底部导航栏组件
export const BottomBar=defineComponent({
    props:{
        selectName: {
            type: String as PropType<string>,
            required: false,
          },
    },
    
    setup:(props,context)=>{
      
        const iconBtns=[{iconName:'home',selected:true,link:'/main'},{iconName:'chart',selected:false,link:''},{iconName:'add',selected:false,link:'/items/create'},{iconName:'export',selected:false,link:''},{iconName:'user',selected:false,link:''}];
     
      
        return ()=>(
            
            <div class={s.bottomBar}   >
                {
                   iconBtns.map(item=>{
                    return ( <RouterLink to={item.link} class={[s.icon,props.selectName===item.iconName?s.selected:'']}><TextIcon    onClick={()=>context.emit('update:selectName', item.iconName)}  textIconName={item.iconName as TextIconNames} ></TextIcon></RouterLink>  )
                   }) 
                }
                 
            </div>
        )
    }
})
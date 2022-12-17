import s from './BottomBar.module.scss';
import { defineComponent,PropType,ref } from "vue";
import { TextIcon,TextIconNames } from './TextIcon';

// 底部导航栏组件
export const BottomBar=defineComponent({
    props:{
        selectName: {
            type: String as PropType<string>,
            required: false,
          },
    },
    
    setup:(props,context)=>{
      
        const iconBtns=[{iconName:'home',selected:true},{iconName:'chart',selected:false},{iconName:'add',selected:false},{iconName:'export',selected:false},{iconName:'user',selected:false}];
     
      
        return ()=>(
            
            <div class={s.bottomBar}   >
                {
                   iconBtns.map(item=>{
                    return (<TextIcon  class={[s.icon,props.selectName===item.iconName?s.selected:'']}  onClick={()=>context.emit('update:selectName', item.iconName)}  textIconName={item.iconName as TextIconNames} ></TextIcon>)
                   }) 
                }
                 
            </div>
        )
    }
})
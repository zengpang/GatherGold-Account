import s from './Tag.module.scss';
import { defineComponent, PropType, reactive } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Rules, validate } from '../../shared/validate';
import { TagForm } from './TagForm';

export const TagCreate =defineComponent({
   props:{
     name:{
        type:String as PropType<string>
     }
   },
   setup:(props,context)=>{
      
      return ()=>(
        <MainLayout iconShow={true} iconPath={'/items/create'}>
          {{
              title: () => '标签创建',
              default:()=>(<TagForm class={s.tagForm}  />)
          }}
        </MainLayout>
      )
   }
})
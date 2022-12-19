import s from './TagCreate.module.scss';
import { defineComponent, PropType } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
export const TagCreate =defineComponent({
   props:{
     name:{
        type:String as PropType<string>
     }
   },
   setup:(props,context)=>{
      return ()=>(
        <MainLayout iconShow={true}>

        </MainLayout>
      )
   }
})
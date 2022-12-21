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
        <MainLayout iconShow={true} iconPath={'/items/create'}>
          {{
              title: () => '标签创建',
              default:()=><div>
                标签创建页面
              </div>
          }}
        </MainLayout>
      )
   }
})
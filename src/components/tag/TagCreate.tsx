import s from './TagCreate.module.scss';
import { defineComponent, PropType, reactive } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
export const TagCreate =defineComponent({
   props:{
     name:{
        type:String as PropType<string>
     }
   },
   setup:(props,context)=>{
      const formData=reactive({
        name:'',
        sign:'',
      })
      const errors=reactive<{[k in keyof typeof formData]?:string[]}>({})
      const onSubmit=(e:Event)=>{
        const rules:Rules<typeof formData>=[
          
        ]
      }
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
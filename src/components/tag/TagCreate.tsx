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
      const formData=reactive({
        name:'',
        sign:'',
      })
      const errors=reactive<{[k in keyof typeof formData]?:string[]}>({})
      const onSubmit=(e:Event)=>{
        const rules:Rules<typeof formData>=[
          { key: 'name', type: 'required', message: '必填' },
          { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
          { key: 'sign', type: 'required', message: '必填' },     
        ]
        Object.assign(errors,{
          name:undefined,
          sign:undefined
        })
        Object.assign(errors,validate(formData,rules));
        e.preventDefault();
      }
      return ()=>(
        <MainLayout iconShow={true} iconPath={'/items/create'}>
          {{
              title: () => '标签创建',
              default:()=>(<TagForm />)
          }}
        </MainLayout>
      )
   }
})
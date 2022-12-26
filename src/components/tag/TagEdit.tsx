import { defineComponent, reactive, resolveComponent } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';


import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
import { TagForm } from './TagForm';
export const TagEdit=defineComponent({
 
    setup:(props,context)=>{
        const formData=reactive({
           name:'',
           sign:''
        });
        const errors=reactive<{[k in keyof typeof formData]?:string[]}>({});
        const onSubmit=(e:Event)=>{
            const rules: Rules<typeof formData> = [
                { key: 'name', type: 'required', message: '必填' },
                { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
                { key: 'sign', type: 'required', message: '必填' },
            ];
            Object.assign(errors,{
                name:undefined,
                sign:undefined
            });
            Object.assign(errors,validate(formData,rules));
            e.preventDefault();
        }
        return () => (
            <MainLayout iconShow={true}>{{
              title: () => '标签修改',
              
              default: () => <>
                <TagForm class={s.tagForm} isShowDeBtn={true}/>
                {/* <div class={s.actions}>
                 
                  <Button  class={s.removeTagsAndItems} onClick={() => { }}>删除标签和记账</Button>
                </div> */}
              </>
            }}</MainLayout>
          )
    }
})
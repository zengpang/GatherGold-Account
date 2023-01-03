import { Dialog } from 'vant';
import { defineComponent, reactive, resolveComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { http } from '../../shared/Http';
import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
import { TagForm } from './TagForm';
export const TagEdit=defineComponent({
    setup:(props,context)=>{
         const route=useRoute();
        //获取Tagid
        const numberId=parseInt(route.params.id!.toString());
        //判断Tagid是否为空，如果为空则判断id不存在
        if(Number.isNaN(numberId))
        {
          return ()=><div>id 不存在</div>
        }
        const router=useRouter();
        const onError=()=>{
          Dialog.alert({title:'提示',message:'删除失败'})
        }
        const onDelete=async(options?:{withItems?: boolean })=>{
          await Dialog.confirm({
            title:'确认',
            message:'你真的要删除吗?'
          })
          await http
          .delete(`/tags/${numberId}`,{
            withItems:options?.withItems?'true':'false',
          })
          .catch(onError)
          router.back();
        }
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
                <TagForm id={numberId} class={s.tagForm} isShowDeBtn={true}/>
                {/* <div class={s.actions}>
                 
                  <Button  class={s.removeTagsAndItems} onClick={() => { }}>删除标签和记账</Button>
                </div> */}
              </>
            }}</MainLayout>
          )
    }
})
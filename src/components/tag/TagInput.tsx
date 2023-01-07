import { defineComponent, onMounted, reactive, resolveComponent } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { InputPad} from '../item/InputPad';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { TagItem } from '../../shared/TagItem';
import s from './TagInput.module.scss';
import { AxiosError } from 'axios';
import { Dialog } from 'vant';
import { http } from '../../shared/Http';
export const TagInput=defineComponent({
    setup:(props,context)=>{
        const route = useRoute();
        const numberId = parseInt(route.params.id!.toString());
        
        const router=useRouter();
        
        const formData=reactive({
            id: undefined,
            name: '',
            sign: '',
            kind:route.query.kind!.toString(),
            amount:0,
            happen_at:new Date().toISOString()
        });
       
        const onError=(error:AxiosError<ResourceError>)=>{
            if(error.response?.status===422)
            {
                Dialog.alert({
                    title:'出错',
                    message:Object.values(error.response.data.errors).join('\n'),

                });
            };
            throw error;
        };
        const onSubmit = async () => {
            let Date={

            }
            await http
              .post<Resource<Item>>('/items', formData, {
                _mock: 'itemCreate' 
              })
              .catch(onError);
            router.push('/main/home');
          };
        onMounted(async ()=>{
            if(!numberId){return};
            
            const response = await http.get<Resource<Tag>>(`/tags/${numberId}`, {
                _mock: 'tagShow'
            })
            Object.assign(formData,response.data.resource)
        })
        return ()=>(
            <MainLayout iconShow={true}>
                 {{
                     title: () => '标签数值输入',
                     default:()=><div class={s.tagInput}>
                        <TagItem tagName={formData.name} tagIcon={formData.sign} class={s.titleTag}></TagItem>
                        <InputPad 
                        class={s.inputPad} 
                        v-model:happenAt={formData.happen_at} 
                        v-model:amount={formData.amount}
                        onSubmit={onSubmit}
                        ></InputPad>
                     </div>
                 }}
            </MainLayout>
        )
    }
})
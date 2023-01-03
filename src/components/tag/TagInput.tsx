import { defineComponent, reactive, resolveComponent } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { InputPad} from '../item/InputPad';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { TagItem } from '../../shared/TagItem';
import s from './TagInput.module.scss';
export const TagInput=defineComponent({
    setup:(props,context)=>{
        const route = useRoute();
        const numberId = parseInt(route.params.id!.toString());
        if(Number.isNaN(numberId))
        {
            return ()=><div>id 不存在</div>
        }
        const router=useRouter();
        return ()=>(
            <MainLayout iconShow={true}>
                 {{
                     title: () => '标签数值输入',
                     default:()=><div class={s.tagInput}>
                        <TagItem tagName={'吃饭'} tagIcon={'\u{1F471}'} class={s.titleTag}></TagItem>
                       
                        <InputPad class={s.inputPad}></InputPad>
                     </div>
                 }}
            </MainLayout>
        )
    }
})
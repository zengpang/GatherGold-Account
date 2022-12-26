import { defineComponent, reactive, resolveComponent } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
export const TagInput=defineComponent({
    setup:(props,context)=>{
        return ()=>(
            <MainLayout iconShow={true}>
                 {{
                     title: () => '标签数值输入',
                     default:()=><h1>123</h1>
                 }}
            </MainLayout>
        )
    }
})
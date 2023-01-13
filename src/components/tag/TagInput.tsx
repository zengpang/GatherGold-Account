import { defineComponent, onMounted, reactive, resolveComponent } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { InputPad } from '../item/InputPad';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { TagItem } from '../../shared/TagItem';
import s from './TagInput.module.scss';
import { AxiosError } from 'axios';
import { Dialog } from 'vant';
import { http } from '../../shared/Http';
import { hasError, validate } from '../../shared/validate';
export const TagInput = defineComponent({
    setup: (props, context) => {
        const route = useRoute();
        const numberId = parseInt(route.params.id!.toString());


        // const formData1=reactive<Partial<Item>>({
        //     kind:'expenses',
        //     tag_ids:[],
        //     amount:0,
        //     happen_at:new Date().toISOString()
        // });
        const submitData = reactive<Partial<Item>>({
            kind: route.query.kind!.toString() as ('expenses' | 'income'),
            tag_ids: [numberId],
            amount: 0,
            happen_at: new Date().toISOString()
        })
        const formData = reactive({
            id: undefined,
            // tag_ids: [],
            name: '',
            sign: '',
            kind: route.query.kind!.toString() as ('expenses' | 'income'),
            // amount: 0,
            // happen_at: new Date().toISOString()
        });
        const errors = reactive<FormErrors<typeof submitData>>({ kind: [], tag_ids: [], amount: [], happen_at: [] })
        const router = useRouter()
        const onError = (error: AxiosError<ResourceError>) => {
            if (error.response?.status === 422) {
                Dialog.alert({
                    title: '出错',
                    message: Object.values(error.response.data.errors).join('\n'),

                });
            };
            throw error;
        };
        const onSubmit = async () => {
            Object.assign(errors, { kind: [], tag_ids: [], amount: [], happen_at: [] });
            Object.assign(errors, validate(submitData, [
                { key: 'kind', type: 'required', message: '类型必填' },
                { key: 'tag_ids', type: 'required', message: '标签必填' },
                { key: 'amount', type: 'required', message: '金额必填' },
                { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为零' },
                { key: 'happen_at', type: 'required', message: '时间必填' },
              ]))
            console.log(submitData);
            if(hasError(errors))
            {
                Dialog.alert({
                    title:'出错',
                    message:Object.values(errors).filter(i=>i.length>0).join('\n')
                })
                return;
            }
            await http
                .post<Resource<Item>>('/items', submitData, {
                    _mock: 'itemCreate'
                })
                .catch(onError);
            router.push('/main/home');
        };
        onMounted(async () => {
            if (!numberId) { return };

            const response = await http.get<Resource<Tag>>(`/tags/${numberId}`, {
                _mock: 'tagShow'
            })
            Object.assign(formData, response.data.resource)
        })
        return () => (
            <MainLayout iconShow={true}>
                {{
                    title: () => '标签数值输入',
                    default: () => <div class={s.tagInput}>
                        <TagItem tagName={formData.name} tagIcon={formData.sign} class={s.titleTag}></TagItem>
                        <InputPad
                            class={s.inputPad}
                            v-model:happenAt={submitData.happen_at}
                            v-model:amount={submitData.amount}
                            onSubmit={onSubmit}
                        ></InputPad>
                    </div>
                }}
            </MainLayout>
        )
    }
})
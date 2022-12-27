import s from './LoginPage.module.scss';
import { defineComponent, PropType, reactive,ref } from 'vue';
import { Form, FormItem } from '../../shared/Form';
import { validate } from '../../shared/validate';
import { Button } from '../../shared/Button';
import { MainLayout } from '../../layouts/MainLayout';
import { GifIcon } from '../../shared/GifIcon';
import LoadGif from '../../assets/icons/GifIcons/LoginGif.json';
import axios from 'axios';
import { useBool } from '../../hooks/useBool';
import { useRoute, useRouter } from 'vue-router';
export const LoginPage = defineComponent({
    setup: (props, context) => {
        const formData = reactive({
            email: '',
            code: ''
        })
        const errors = reactive({
            email: [],
            code: []
        })
        const refValidationCode = ref<any>();
        const {ref:refDisabled,toggle,on:disabled,off:enable}=useBool(false);
        const router=useRouter();
        const route=useRoute();
        const onSubmit = (e: Event) => {
            e.preventDefault();
            Object.assign(errors, {
                email: [], code: []
            })
            Object.assign(errors, validate(formData, [
                { key: 'email', type: 'required', message: '必填' },
                { key: 'email', type: 'pattern', regex: /.+@.+/, message: '必须是邮箱地址' },
                { key: 'code', type: 'required', message: '必填' },
            ]))
        }
        const onClickSendValidationCode=async()=>{
            console.log("发送验证码");
            //http://121.196.236.94:3000/
            const response=await axios.post('api/v1/validation_codes',{email:formData.email})
            .catch(()=>{
                //失败
            })
            //成功
            refValidationCode.value.startCount();
        }
        return () => (
            <MainLayout iconShow={false}>{
              {
                title: () => '登录',
               
                default: () => (
                  <div class={s.wrapper}>
                    <div class={s.logo}>
                      <GifIcon gifJson={LoadGif} class={s.icon}/>
                      <h1 class={s.appName}>欢迎登录</h1>
                    </div>
                    <Form onSubmit={onSubmit}>
                      <FormItem label="邮箱地址" type="text"
                        placeholder='请输入邮箱，然后点击发送验证码'
                        v-model={formData.email} error={errors.email?.[0]} />
                      <FormItem ref={refValidationCode} label="验证码" type="validationCode"
                        placeholder='请输入六位数字'
                        countFrom={60}
                        disabled={refDisabled.value}
                        onClick={onClickSendValidationCode}
                        v-model={formData.code} error={errors.code?.[0]}  />
                      <FormItem style={{ paddingTop: '2.15vh' }}>
                        <Button class={s.loginBtn}>登 录</Button>
                      </FormItem>
                    </Form>
                  </div>
                )
              }
            }</MainLayout>
          )
    }
})

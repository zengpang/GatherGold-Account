import s from './LoginPage.module.scss';
import { defineComponent, PropType, reactive } from 'vue';
import { Form, FormItem } from '../../shared/Form';
import { validate } from '../../shared/validate';
import { Button } from '../../shared/Button';
import { MainLayout } from '../../layouts/MainLayout';
import { GifIcon } from '../../shared/GifIcon';
import LoadGif from '../../assets/icons/GifIcons/LoginGif.json'
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
                      <FormItem label="验证码" type="validationCode"
                        placeholder='请输入六位数字'
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

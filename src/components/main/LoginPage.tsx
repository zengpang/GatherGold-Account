import s from './LoginPage.module.scss';
import { defineComponent, onMounted, PropType, reactive, ref } from 'vue';
import { Form, FormItem } from '../../shared/Form';
import { hasError, validate } from '../../shared/validate';
import { Button } from '../../shared/Button';
import { MainLayout } from '../../layouts/MainLayout';
import { GifIcon } from '../../shared/GifIcon';
import LoadGif from '../../assets/icons/GifIcons/LoginGif.json';
import axios from 'axios';
import { useBool } from '../../hooks/useBool';
import { useRoute, useRouter } from 'vue-router';
import { http } from '../../shared/Http';
import { mePromise, refreshMe } from '../../shared/me';
import { Dialog } from 'vant';
import { TextIcon } from '../../shared/TextIcon';
import { useMeStore } from '../../stores/useMeStore';

export const LoginPage = defineComponent({
  setup: (props, context) => {
    const meStore = useMeStore();
    const formData = reactive({
      email: '2516629927@qq.com',
      code: '123456'
    })
    const errors = reactive({
      email: [],
      code: []
    })
    const refValidationCode = ref<any>();
    const { ref: refDisabled, toggle, on: disabled, off: enable } = useBool(false);
    const router = useRouter();
    const route = useRoute();
    const me = ref<User>()
    onMounted(async () => {

      const response = await meStore.mePromise;
      me.value = response?.data.resource;
      const userEmail=localStorage.getItem('userEmail');
      const userId=Number(localStorage.getItem('userId'));
      if(userEmail&&userId&&!me.value)
      {
        console.log("启用缓存");
        me.value={id:userId,email:userEmail};
      }
      else if(me.value)
      {
        localStorage.setItem('userId',me.value!.id.toString());
        localStorage.setItem('userEmail',me.value!.email);
      }
    })
    const onSignOut = async () => {
      await Dialog.confirm({
        title: '确认',
        message: '你真的要退出登录吗？',
      })
      localStorage.removeItem('jwt');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      window.location.reload();
    }

    const onSubmit = async (e: Event) => {
      e.preventDefault()
      
      Object.assign(errors, {
        email: [], code: []
      })
      Object.assign(errors, validate(formData, [
        { key: 'email', type: 'required', message: '必填' },
        { key: 'email', type: 'pattern', regex: /.+@.+/, message: '必须是邮箱地址' },
        { key: 'code', type: 'required', message: '必填' },
      ]))
      if (!hasError(errors)) {
        const response = await http.post<{ jwt: string }>('/session', formData)
          .catch(onError)
        console.log(me.value)
        localStorage.setItem('jwt', response.data.jwt);
       
        // router.push('/sign_in?return_to='+ encodeURIComponent(route.fullPath))
        const returnTo = route.query.return_to?.toString()
        refreshMe()
        meStore.refreshMe();
        router.push(returnTo || '/main/home');
      }
    }
    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors);
      }
      throw error;
    }
    const onClickSendValidationCode = async () => {
      disabled();
      //http://121.196.236.94:3000/

      const response = await http
        .post('/validation_codes', { email: formData.email })
        .catch(onError)
        .finally(enable)
      //成功
      refValidationCode.value.startCount();
    }
    return () => (
      <MainLayout iconShow={false} isScallPage={true}>{
        {
          title: () => me.value ? '个人中心' : '登录',

          default: () => 
            me.value ? (<div class={s.wrapper}>
              <div class={s.logo}>
                <TextIcon textIconName='user' class={s.headIcon}>

                </TextIcon>
              </div>
              <div class={s.userInfo}>
                <p class={s.email}>{me.value?.email}</p>
                <p class={s.welcome}>欢迎用户</p>
              </div>
              <div class={s.footer}>
                <Button class={s.signOutBtn} onClick={onSignOut}>退出登录</Button>
              </div>
            </div>) : (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <GifIcon gifJson={LoadGif} class={s.icon} />
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
                  v-model={formData.code} error={errors.code?.[0]} />
                <FormItem style={{ paddingTop: '2.15vh' }}>
                  <Button type="submit" class={s.loginBtn}>登 录</Button>
                </FormItem>
              </Form>
            </div>
          )
          }
        }
      
      </MainLayout>)
  }

})

import {defineComponent,ref} from 'vue';
import s from './WelcomeLayout.module.scss';
import {RouterLink} from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';
import cloundGif from '../../assets/icons/CloundGif.json'
import { useLoad,LoadTypes } from '../../hooks/useLoad';
export const Forth = defineComponent({
  setup: () => {
    const icon = ref<HTMLElement>();
    useLoad(icon, LoadTypes.loadGif, cloundGif);
    return () => (
      <WelcomeLayout>
        {{
          icon: () => <div class={s.icon} ref={icon}></div>,
          title: () => <h2>云备份<br/>再也不怕数据丢失</h2>,
          titleContent: () => <a>云备份功能，助您"分"毫不失</a>,
          button: () => <RouterLink class={s.nextBtn} to="/welcome/4" >下 一 页</RouterLink>
        }}
      </WelcomeLayout>
    )
  }
})
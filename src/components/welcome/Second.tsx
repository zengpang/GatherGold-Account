import {defineComponent,ref} from 'vue';
import s from './WelcomeLayout.module.scss';
import {RouterLink} from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';
import timeGif from '../../assets/icons/TimeGif.json'
import { useLoad,LoadTypes } from '../../hooks/useLoad';
export const Second = defineComponent({
  setup: () => {
    const icon = ref<HTMLElement>();
    useLoad(icon, LoadTypes.loadGif, timeGif);
    return () => (
      <WelcomeLayout>
        {{
          icon: () => <div class={s.icon} ref={icon}></div>,
          title: () => <h2>每日提醒<br/>不会遗漏每一笔账单</h2>,
          titleContent: () => <a>每日提醒功能，助您每"分"必争</a>,
          button: () => <RouterLink class={s.nextBtn} to="/welcome/3" >下 一 页</RouterLink>
        }}
      </WelcomeLayout>
    )
  }
})
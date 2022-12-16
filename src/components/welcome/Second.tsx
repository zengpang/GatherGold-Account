import {defineComponent,ref} from 'vue';
import s from './WelcomeLayout.module.scss';
import {RouterLink} from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';
import timeGif from '../../assets/icons/TimeGif.json'
import { GifIcon } from '../../shared/GifIcon';
import { Button } from '../../shared/Button';
export const Second = defineComponent({
  setup: () => {
    const icon = ref<HTMLElement>();
   
    return () => (
      <WelcomeLayout>
        {{
           icon: () => <GifIcon class={s.icon } gifJson={timeGif}></GifIcon>,
          title: () => <h2>每日提醒<br/>不会遗漏每一笔账单</h2>,
          titleContent: () => <a>每日提醒功能，助您每"分"必争</a>,
          button: () => <RouterLink  to="/welcome/3" ><Button  class={s.nextBtn}>下 一 页</Button></RouterLink>
        }}
      </WelcomeLayout>
    )
  }
})
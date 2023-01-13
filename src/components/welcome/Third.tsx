import {defineComponent,ref} from 'vue';
import s from './WelcomeLayout.module.scss';
import {RouterLink} from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';
import chartGif from '../../assets/icons/GifIcons/ChartGif.json'
import { GifIcon } from '../../shared/GifIcon';
import { Button } from '../../shared/Button';
export const Third=defineComponent({
   setup: () => {
      const icon = ref<HTMLElement>();

      return () => (
        <WelcomeLayout>
          {{
            icon: () => <GifIcon class={s.icon  } gifJson={chartGif}></GifIcon>,
            title: () => <h2>数据可视化<br/>收支一目了然</h2>,
            titleContent: () => <a>数据可视化功能，助您"分"毫必究</a>,
            button: () => <RouterLink to="/welcome/4" ><Button  class={s.nextBtn}>下 一 页</Button></RouterLink>
          }}
        </WelcomeLayout>
      )
    }
})
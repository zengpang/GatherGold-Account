import {defineComponent,ref} from 'vue';
import s from './WelcomeLayout.module.scss';
import {RouterLink} from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';
import cloundGif from '../../assets/icons/CloundGif.json'
import { GifIcon } from '../../shared/GifIcon';
import { Button } from '../../shared/Button';
export const Forth = defineComponent({
  setup: () => {
    return () => (
      <WelcomeLayout>
        {{
          icon: () => <GifIcon class={s.icon  } gifJson={cloundGif}></GifIcon>,
          title: () => <h2>云备份<br/>再也不怕数据丢失</h2>,
          titleContent: () => <a>云备份功能，助您"分"毫不失</a>,
          button: () => <RouterLink  to="/start" ><Button  class={s.nextBtn}>下 一 页</Button></RouterLink>
        }}
      </WelcomeLayout>
    )
  }
})
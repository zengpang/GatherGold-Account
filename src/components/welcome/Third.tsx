import {defineComponent,ref} from 'vue';
import s from './WelcomeLayout.module.scss';
import {RouterLink} from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';
import chartGif from '../../assets/icons/ChartGif.json'
import { useLoad,LoadTypes } from '../../hooks/useLoad';
export const Third=defineComponent({
   setup: () => {
      const icon = ref<HTMLElement>();
      useLoad(icon, LoadTypes.loadGif, chartGif);
      return () => (
        <WelcomeLayout>
          {{
            icon: () => <div class={s.icon} ref={icon}></div>,
            title: () => <h2>数据可视化<br/>收支一目了然</h2>,
            titleContent: () => <a>数据可视化功能，助您"分"毫必究</a>,
            button: () => <RouterLink class={s.nextBtn} to="/welcome/4" >下 一 页</RouterLink>
          }}
        </WelcomeLayout>
      )
    }
})
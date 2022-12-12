import {defineComponent,ref} from 'vue';
import s from './WelcomeLayout.module.scss';
import {RouterLink} from 'vue-router';

export const StartPage=defineComponent({
   setup: () => {
      const icon = ref<HTMLElement>();
     
      return () => (
        <h1>start</h1>
      )
    }
})
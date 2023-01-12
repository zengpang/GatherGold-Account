import { defineComponent, ref } from 'vue'
import { RouterView } from 'vue-router'

import { BottomBar } from '../shared/BottomBar'

import s from './MainPage.module.scss'

export const MainPage = defineComponent({
    setup: (props, context) => {
        // const refKind = ref('home');

        return () => (
          
            <div class={s.wrapper}>
                  <RouterView class={s.container}>
                  </RouterView>
                 <BottomBar ></BottomBar>
            </div>

        )
    }
})
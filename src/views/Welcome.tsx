import { defineComponent,ref,Transition,VNode, watchEffect } from 'vue'
import {RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router'
import {RouterLink} from 'vue-router';
import { useSwipe } from '../hooks/useSwipe';
import {throttle} from '../shared/throttle';
import { SkipFeatures } from '../shared/SkipFeatures';
import s from './Welcome.module.scss'
const pushMap:Record<string,string>={
    'Welcome1': '/welcome/2',
    'Welcome2': '/welcome/3',
    'Welcome3': '/welcome/4',
    'Welcome4': '/start',
}
export const Welcome = defineComponent({
    setup: () => {
        const main=ref<HTMLElement>();
        const {direction,swiping}=useSwipe(main,{beforeStart:e=>e.preventDefault()})
        const route=useRoute();
        const router=useRouter();
        const replace=throttle(()=>{
            const name=(route.name||'Welcome1').toString();
            console.log(pushMap[name]);
            router.replace(pushMap[name])
        },600);
        watchEffect(()=>{
            if(swiping.value&&direction.value==='left')
            {
                replace();
            }
        })
        return () => (<div class={s.wrapper}>
            <main ref={main}>
            <RouterView >
          {({ Component: X, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
            <Transition enterFromClass={s.slide_fade_enter_from} enterActiveClass={s.slide_fade_enter_active}
              leaveToClass={s.slide_fade_leave_to} leaveActiveClass={s.slide_fade_leave_active}>
              {X}
            </Transition>
          }
        </RouterView>
            </main>
            <footer>
               <SkipFeatures class={s.fake}><RouterLink to="/start">跳过</RouterLink></SkipFeatures> 
            </footer>
        </div>

        )
            ;
    }
})